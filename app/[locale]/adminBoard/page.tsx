"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import MDEditor from "@uiw/react-md-editor";
import { dictionary } from "@/i18n/dictionary";
import { useRouter } from "next/navigation";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";

const MDEditorDynamic = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

interface BlogFormData {
  id: string;
  slug: string;
  title: { uk: string; ru: string };
  excerpt: { uk: string; ru: string };
  content: { uk: string; ru: string };
  mainImage: string;
  isPublished: boolean;
  publishDate: string;
}

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_LOGIN;
  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        onLogin();
      } else {
        setError("Невірний логін або пароль");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-md w-full space-y-6 sm:space-y-7 md:space-y-8 bg-white p-6 sm:p-7 md:p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl sm:text-2xl md:text-3xl font-extrabold text-red-900">
            Адмін панель
          </h2>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-sm text-red-600">
            Введіть свої облікові дані для доступу до адмін панелі
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded">
            {error}
          </div>
        )}

        <div className="mt-6 sm:mt-7 md:mt-8 space-y-4 sm:space-y-5 md:space-y-6">
          <div className="rounded-md space-y-3 sm:space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Логін
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Логін"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded relative block w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 text-xs sm:text-sm md:text-sm"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-1.5 sm:py-2 px-3 sm:px-4 border border-transparent text-xs sm:text-sm md:text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {loading ? "Вхід..." : "Увійти"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogEditor = ({
  language,
  onSave,
  // onCancel,
  initialData,
  onReset,
}: {
  language: "uk" | "ru";
  onSave: (blogData: BlogFormData) => void;
  // onCancel: () => void;
  initialData?: Partial<BlogFormData> | null;
  onReset: () => void;
}) => {
  const [currentLang, setCurrentLang] = useState<"uk" | "ru">(language);
  const [isPreview, setIsPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = dictionary[currentLang].editor;

  const [formData, setFormData] = useState<BlogFormData>({
    id: initialData?.id || `${Date.now()}`,
    slug: initialData?.slug || "",
    title: {
      uk: initialData?.title?.uk || "",
      ru: initialData?.title?.ru || "",
    },
    excerpt: {
      uk: initialData?.excerpt?.uk || "",
      ru: initialData?.excerpt?.ru || "",
    },
    content: {
      uk: initialData?.content?.uk || "",
      ru: initialData?.content?.ru || "",
    },
    mainImage: initialData?.mainImage || "",
    isPublished: initialData?.isPublished || false,
    publishDate: initialData?.publishDate || new Date().toISOString(),
  });

  useEffect(() => {
    if (!initialData) {
      setFormData({
        id: `${Date.now()}`,
        slug: "",
        title: { uk: "", ru: "" },
        excerpt: { uk: "", ru: "" },
        content: { uk: "", ru: "" },
        mainImage: "",
        isPublished: false,
        publishDate: new Date().toISOString(),
      });
      setErrors({});
    } else {
      setFormData({
        id: initialData.id || `${Date.now()}`,
        slug: initialData.slug || "",
        title: {
          uk: initialData.title?.uk || "",
          ru: initialData.title?.ru || "",
        },
        excerpt: {
          uk: initialData.excerpt?.uk || "",
          ru: initialData.excerpt?.ru || "",
        },
        content: {
          uk: initialData.content?.uk || "",
          ru: initialData.content?.ru || "",
        },
        mainImage: initialData.mainImage || "",
        isPublished: initialData.isPublished || false,
        publishDate: initialData.publishDate || new Date().toISOString(),
      });
    }
  }, [initialData]);

  const handleInputChange = (
    field: keyof BlogFormData,
    value: string | boolean
  ) => {
    if (field === "isPublished") {
      setFormData((prev) => ({ ...prev, [field]: Boolean(value) }));
    } else if (
      field === "mainImage" ||
      field === "slug" ||
      field === "id" ||
      field === "publishDate"
    ) {
      setFormData((prev) => ({ ...prev, [field]: value as string }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[
            field as keyof Pick<BlogFormData, "title" | "excerpt" | "content">
          ],
          [currentLang]: value,
        },
      }));
    }
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleContentChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, [currentLang]: value || "" },
    }));
    setErrors((prev) => ({ ...prev, content: "" }));
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData((prev) => ({ ...prev, mainImage: result }));
        setErrors((prev) => ({ ...prev, mainImage: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const insertImageToContent = () => {
    if (imageUrl) {
      const imageMarkdown = `![](${imageUrl})`;
      const currentContent = formData.content[currentLang];
      setFormData((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [currentLang]: currentContent + "\n\n" + imageMarkdown,
        },
      }));
      setImageUrl("");
      setShowImageInput(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.uk) newErrors.title_uk = t.required;
    if (!formData.title.ru) newErrors.title_ru = t.required;
    if (!formData.excerpt.uk) newErrors.excerpt_uk = t.required;
    if (!formData.excerpt.ru) newErrors.excerpt_ru = t.required;
    if (!formData.content.uk) newErrors.content_uk = t.required;
    if (!formData.content.ru) newErrors.content_ru = t.required;
    if (!formData.mainImage) newErrors.mainImage = t.required;
    if (!formData.slug) newErrors.slug = t.required;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (publish: boolean) => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const blogData = {
        ...formData,
        isPublished: publish,
        publishDate: publish ? new Date().toISOString() : formData.publishDate,
      };
      await onSave(blogData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {initialData ? t.updating : t.creating}
        </h1>
        <div className="flex items-center space-x-4">
          <select
            value={currentLang}
            onChange={(e) => setCurrentLang(e.target.value as "uk" | "ru")}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
          >
            <option value="uk">{t.ukrainian}</option>
            <option value="ru">{t.russian}</option>
          </select>
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            {isPreview ? t.edit : t.preview}
          </button>
        </div>
      </div>

      {!isPreview ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder="first-blog-post"
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.title} ({currentLang === "uk" ? t.ukrainian : t.russian}) *
            </label>
            <input
              type="text"
              value={formData.title[currentLang]}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              placeholder={t.title}
            />
            {errors[`title_${currentLang}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`title_${currentLang}`]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.excerpt} ({currentLang === "uk" ? t.ukrainian : t.russian}) *
            </label>
            <textarea
              value={formData.excerpt[currentLang]}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              rows={3}
              placeholder={t.excerpt}
            />
            {errors[`excerpt_${currentLang}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`excerpt_${currentLang}`]}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.mainImage} *
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={formData.mainImage}
                onChange={(e) => handleInputChange("mainImage", e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                placeholder={t.imageUrl}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Завантажити
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {errors.mainImage && (
              <p className="text-red-500 text-sm mt-1">{errors.mainImage}</p>
            )}
            {formData.mainImage && (
              <div className="mt-2">
                <img
                  src={formData.mainImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {t.content} ({currentLang === "uk" ? t.ukrainian : t.russian}) *
              </label>
              <button
                onClick={() => setShowImageInput(!showImageInput)}
                className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
              >
                {t.addImage}
              </button>
            </div>

            {showImageInput && (
              <div className="mb-4 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    placeholder={t.imageUrl}
                  />
                  <button
                    onClick={insertImageToContent}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Вставити
                  </button>
                </div>
              </div>
            )}

            <div data-color-mode="light">
              <MDEditorDynamic
                value={formData.content[currentLang]}
                onChange={handleContentChange}
                preview="edit"
                height={400}
                visibleDragbar={false}
              />
            </div>
            {errors[`content_${currentLang}`] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[`content_${currentLang}`]}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="prose max-w-4xl">
            <h1>{formData.title[currentLang]}</h1>
            <p className="text-gray-600">{formData.excerpt[currentLang]}</p>
            {formData.mainImage && (
              <img
                src={formData.mainImage}
                alt="Main"
                className="w-full h-64 object-cover rounded-md"
              />
            )}
            <MDEditor.Markdown
              source={formData.content[currentLang]}
              style={{ whiteSpace: "pre-wrap" }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t">
        <button
          onClick={onReset}
          className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {t.cancel}
        </button>
        <button
          onClick={() => handleSave(false)}
          disabled={isLoading}
          className="px-6 py-2 text-gray-700 bg-yellow-100 rounded-md hover:bg-yellow-200 transition-colors disabled:opacity-50"
        >
          {isLoading ? t.creating : t.saveDraft}
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={isLoading}
          className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {isLoading ? t.creating : t.publishNow}
        </button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const router = useRouter();
  const currentLang = useCurrentLanguage() as "uk" | "ru";
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<BlogFormData[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogFormData | null>(null);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  const t = dictionary[currentLang].editor;

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoadingBlogs(true);
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setSaveError("Failed to load blogs");
        setTimeout(() => setSaveError(null), 3000);
      } finally {
        setIsLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSaveBlog = async (blogData: BlogFormData) => {
    try {
      setSaveError(null);
      setSaveSuccess(null);

      const method =
        blogData.id && blogs.some((b) => b.id === blogData.id) ? "PUT" : "POST";
      const response = await fetch("/api/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      setSaveSuccess(method === "POST" ? t.creating : t.updating);
      setTimeout(() => setSaveSuccess(null), 3000);

      const updatedBlogs = await fetch("/api/blogs").then((res) => res.json());
      setBlogs(updatedBlogs.blogs || []);
      setSelectedBlog(null);
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save blog"
      );
      setTimeout(() => setSaveError(null), 3000);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    const confirmMessage = t.deleteConfirm.replace(
      "{title}",
      blogs.find((b) => b.id === blogId)?.title[currentLang] || ""
    );
    if (!window.confirm(confirmMessage)) return;

    try {
      setSaveError(null);
      setSaveSuccess(null);

      const response = await fetch(`/api/blogs?id=${blogId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error);
      }

      setSaveSuccess(t.deleteSuccess);
      setTimeout(() => setSaveSuccess(null), 3000);

      const updatedBlogs = await fetch("/api/blogs").then((res) => res.json());
      setBlogs(updatedBlogs.blogs || []);
      if (selectedBlog?.id === blogId) {
        setSelectedBlog(null);
      }
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to delete blog"
      );
      setTimeout(() => setSaveError(null), 3000);
    }
  };

  const handleResetForm = () => {
    setSelectedBlog(null);
  };

  const handleEditBlog = (blog: BlogFormData) => {
    setSelectedBlog(blog);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0">
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl md:text-xl font-semibold">
                Адмін панель
              </h1>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              <button
                onClick={onLogout}
                className="ml-0 sm:ml-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm md:text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Вийти
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-6 sm:py-8 md:py-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 sm:mb-6">
          Керування блогами
        </h2>
        {saveSuccess && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {saveSuccess}
          </div>
        )}
        {saveError && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {saveError}
          </div>
        )}
        <div className="mb-6">
          <button
            onClick={handleResetForm}
            className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
          >
            Створити новий блог
          </button>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{t.blogList}</h3>
          {isLoadingBlogs ? (
            <p>Завантаження...</p>
          ) : blogs.length === 0 ? (
            <p>Немає блогів</p>
          ) : (
            <ul className="space-y-2">
              {blogs.map((blog) => {
                const formattedDate = new Date(
                  blog.publishDate
                ).toLocaleDateString(currentLang, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li
                    key={blog.id}
                    className="flex items-center justify-between bg-white p-4 rounded-md shadow"
                  >
                    <div>
                      <h4 className="text-md font-medium">
                        {blog.title[currentLang]}
                      </h4>
                      <p
                        className={`text-sm text-gray-500 ${
                          blog.isPublished ? "font-bold" : "italic"
                        }`}
                      >
                        {blog.isPublished ? "Опубліковано" : "Чернетка"} |{" "}
                        {formattedDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditBlog(blog)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        Редагувати
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                      >
                        Видалити
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {selectedBlog ? "Редагувати блог" : "Створити новий блог"}
        </h3>
        <BlogEditor
          language={currentLang}
          onSave={handleSaveBlog}
          // onCancel={handleResetForm}
          initialData={selectedBlog}
          onReset={handleResetForm}
        />
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}
