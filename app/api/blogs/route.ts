import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const blogsFilePath = path.join(process.cwd(), "blogs.json");

interface Blog {
  id: string;
  slug: string;
  title: { uk: string; ru: string };
  excerpt: { uk: string; ru: string };
  content: { uk: string; ru: string };
  mainImage: string;
  isPublished: boolean;
  publishDate: string;
}

interface BlogsData {
  blogs: Blog[];
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data: BlogsData = JSON.parse(fileContent);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error reading blogs.json:", error);
    return NextResponse.json(
      { error: "Failed to read blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const newBlog: Blog = await req.json();

    if (
      !newBlog.id ||
      !newBlog.slug ||
      !newBlog.title.uk ||
      !newBlog.title.ru ||
      !newBlog.mainImage
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data: BlogsData = JSON.parse(fileContent);

    if (
      data.blogs.some(
        (blog) => blog.slug === newBlog.slug || blog.id === newBlog.id
      )
    ) {
      return NextResponse.json(
        { error: "Blog with this slug or ID already exists" },
        { status: 409 }
      );
    }

    data.blogs.push(newBlog);
    await fs.writeFile(blogsFilePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedBlog: Blog = await req.json();

    if (
      !updatedBlog.id ||
      !updatedBlog.slug ||
      !updatedBlog.title.uk ||
      !updatedBlog.title.ru ||
      !updatedBlog.mainImage
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data: BlogsData = JSON.parse(fileContent);

    const blogIndex = data.blogs.findIndex(
      (blog) => blog.id === updatedBlog.id
    );
    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (
      data.blogs.some(
        (blog, index) => blog.slug === updatedBlog.slug && index !== blogIndex
      )
    ) {
      return NextResponse.json(
        { error: "Blog with this slug already exists" },
        { status: 409 }
      );
    }

    data.blogs[blogIndex] = updatedBlog;
    await fs.writeFile(blogsFilePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, blog: updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const blogId = req.nextUrl.searchParams.get("id");
    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(blogsFilePath, "utf-8");
    const data: BlogsData = JSON.parse(fileContent);

    const blogIndex = data.blogs.findIndex((blog) => blog.id === blogId);
    if (blogIndex === -1) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    data.blogs.splice(blogIndex, 1);
    await fs.writeFile(blogsFilePath, JSON.stringify(data, null, 2), "utf-8");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
