import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const commentsFilePath = path.join(process.cwd(), "comments.json");

interface Comment {
  id: string;
  blogId: string;
  name: string;
  comment: string;
  publishDate: string;
}

interface CommentsData {
  comments: Comment[];
}

// Ініціалізація файлу коментарів, якщо він не існує
async function initializeCommentsFile() {
  try {
    await fs.access(commentsFilePath);
  } catch {
    await fs.writeFile(
      commentsFilePath,
      JSON.stringify({ comments: [] }, null, 2),
      "utf-8"
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await initializeCommentsFile();

    const blogId = req.nextUrl.searchParams.get("blogId");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = 3;

    if (!blogId) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(commentsFilePath, "utf-8");
    const data: CommentsData = JSON.parse(fileContent);

    // Фільтруємо коментарі по blogId та сортуємо за датою (найновіші спершу)
    const blogComments = data.comments
      .filter((comment) => comment.blogId === blogId)
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );

    // Пагінація
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedComments = blogComments.slice(startIndex, endIndex);

    const totalPages = Math.ceil(blogComments.length / limit);

    return NextResponse.json(
      {
        comments: paginatedComments,
        pagination: {
          currentPage: page,
          totalPages,
          totalComments: blogComments.length,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error reading comments.json:", error);
    return NextResponse.json(
      { error: "Failed to read comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await initializeCommentsFile();

    const { blogId, name, comment } = await req.json();

    if (!blogId || !name || !comment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Валідація довжини
    if (name.trim().length === 0 || comment.trim().length === 0) {
      return NextResponse.json(
        { error: "Name and comment cannot be empty" },
        { status: 400 }
      );
    }

    if (name.length > 50) {
      return NextResponse.json(
        { error: "Name is too long (max 50 characters)" },
        { status: 400 }
      );
    }

    if (comment.length > 500) {
      return NextResponse.json(
        { error: "Comment is too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(commentsFilePath, "utf-8");
    const data: CommentsData = JSON.parse(fileContent);

    const newComment: Comment = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      blogId,
      name: name.trim(),
      comment: comment.trim(),
      publishDate: new Date().toISOString(),
    };

    data.comments.push(newComment);
    await fs.writeFile(
      commentsFilePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      { success: true, comment: newComment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { error: "Failed to save comment" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await initializeCommentsFile();

    const commentId = req.nextUrl.searchParams.get("id");
    if (!commentId) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    const fileContent = await fs.readFile(commentsFilePath, "utf-8");
    const data: CommentsData = JSON.parse(fileContent);

    const commentIndex = data.comments.findIndex(
      (comment) => comment.id === commentId
    );
    if (commentIndex === -1) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    data.comments.splice(commentIndex, 1);
    await fs.writeFile(
      commentsFilePath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
