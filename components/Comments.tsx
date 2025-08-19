"use client";

import { useState, useEffect } from "react";
import {
  X,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { useCurrentLanguage } from "@/hooks/getCurrentLanguage";
import { useDictionary } from "@/hooks/getDictionary";
import { Locale } from "@/i18n/config";

interface Comment {
  id: string;
  blogId: string;
  name: string;
  comment: string;
  publishDate: string;
}

interface CommentsResponse {
  comments: Comment[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

interface CommentsProps {
  blogId: string;
}

export default function Comments({ blogId }: CommentsProps) {
  const currentLocale = useCurrentLanguage() as Locale;
  const { dict } = useDictionary(currentLocale);

  const [comments, setComments] = useState<Comment[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalComments: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Перевіряємо, чи користувач адмін
  useEffect(() => {
    const adminStatus = localStorage.getItem("adminLoggedIn");
    setIsAdmin(adminStatus === "true");
  }, []);

  // Завантажуємо коментарі
  const fetchComments = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/comments?blogId=${blogId}&page=${page}`
      );
      if (!response.ok) throw new Error(dict?.comments.error.fetchFailed);

      const data: CommentsResponse = await response.json();
      setComments(data.comments);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setError(dict?.comments.error.fetchFailed ?? "");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  // Обробка відправки коментаря
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.comment.trim()) {
      setError(dict?.comments.error.emptyFields ?? "");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (formData.name.length > 50) {
      setError(dict?.comments.error.nameTooLong ?? "");
      setTimeout(() => setError(null), 3000);
      return;
    }

    if (formData.comment.length > 500) {
      setError(dict?.comments.error.commentTooLong ?? "");
      setTimeout(() => setError(null), 3000);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId,
          name: formData.name,
          comment: formData.comment,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || dict?.comments.error.saveFailed);
      }

      setSuccess(dict?.comments.success.commentAdded ?? "");
      setTimeout(() => setSuccess(null), 3000);
      setFormData({ name: "", comment: "" });
      setIsModalOpen(false);

      // Перезавантажуємо коментарі (повертаємося на першу сторінку)
      fetchComments(1);
    } catch (err) {
      console.error("Error saving comment:", err);
      setError(dict?.comments.error.saveFailed ?? "");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Видалення коментаря (тільки для адміна)
  const handleDeleteComment = async (commentId: string) => {
    if (!window.confirm(dict?.comments.delete)) {
      return;
    }

    try {
      const response = await fetch(`/api/comments?id=${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(dict?.comments.error.deleteFailed);
      }

      setSuccess(dict?.comments.success.commentDeleted ?? "");
      setTimeout(() => setSuccess(null), 3000);

      // Перезавантажуємо поточну сторінку
      fetchComments(pagination.currentPage);
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError(dict?.comments.error.deleteFailed ?? "");
      setTimeout(() => setError(null), 3000);
    }
  };

  // Зміна сторінки
  const handlePageChange = (page: number) => {
    fetchComments(page);
  };

  // Форматування дати
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);

  return (
    <div className="mt-12 border-t pt-8">
      {/* Заголовок секції */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="mr-2 h-6 w-6 text-red-500" />
          {dict?.comments.title} ({pagination.totalComments})
        </h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {dict?.comments.addComment}
        </button>
      </div>

      {/* Повідомлення про помилки/успіх */}
      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {success}
        </div>
      )}

      {/* Завантаження */}
      {isLoading && (
        <div className="text-center py-8 text-gray-600">
          {dict?.utils.loading}
        </div>
      )}

      {/* Список коментарів */}
      {!isLoading && comments.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {dict?.comments.noComments}
        </div>
      )}

      {!isLoading && comments.length > 0 && (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 rounded-lg p-6 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-gray-900">
                      {comment.name}
                    </h4>
                    <span className="ml-2 text-sm text-gray-500">
                      {formatDate(comment.publishDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {comment.comment}
                  </p>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                    title={dict?.comments.delete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Пагінація */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrev}
            className={`p-2 rounded ${
              pagination.hasPrev
                ? "text-red-500 hover:bg-red-50"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="px-4 py-2 text-sm text-gray-600">
            {dict?.comments.pagination.page
              .replace("{current}", pagination.currentPage.toString())
              .replace("{total}", pagination.totalPages.toString())}
          </span>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNext}
            className={`p-2 rounded ${
              pagination.hasNext
                ? "text-red-500 hover:bg-red-50"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Модальне вікно для додавання коментаря */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">
                {dict?.comments.addComment}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict?.comments.name} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder={dict?.comments.namePlaceholder}
                  maxLength={50}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {dict?.comments.characters
                    .replace("{current}", formData.name.length.toString())
                    .replace("{max}", "50")}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {dict?.comments.comment}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent h-24 resize-none"
                  placeholder={dict?.comments.commentPlaceholder}
                  maxLength={500}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  {dict?.comments.characters
                    .replace("{current}", formData.comment.length.toString())
                    .replace("{max}", "500")}
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  {dict?.comments.cancel}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? dict?.comments.submitting
                    : dict?.comments.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
