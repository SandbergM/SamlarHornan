import React, { createContext, useEffect, useState } from "react";

export const ForumContext = createContext();

const ForumContextProvider = (props) => {
  const [threads, setThreads] = useState(null);
  const [forums, setForums] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchThreads = async (title, forumUrl) => {
    let threads = await fetch(
      `/api/v1/threads?forumUrl=${forumUrl}&title=${title}`
    );
    switch (threads.status) {
      case 200:
        setThreads(await threads.json());
        break;
      default:
        setThreads(null);
    }
  };

  const fetchCategories = async () => {
    let categories = await fetch(`/api/v1/categories`);
    switch (categories.status) {
      case 200:
        setCategories(await categories.json());
    }
  };

  const fetchForums = async (nameSearch, categorySearch) => {
    let forums = await fetch(
      `/api/v1/forums?name=${nameSearch}&categoryId=${categorySearch}`
    );
    switch (forums.status) {
      case 200:
        setForums(await forums.json());
        break;
      default:
        setForums(null);
    }
  };

  const deleteThread = async (id) => {
    let deleteThread = await fetch(`/api/v1/threads/${id}`, {
      method: "DELETE",
    });
    if (deleteThread.ok) {
      let tempArr = threads.filter((thread) => {
        if (thread.id !== id) return thread;
      });
      setThreads(tempArr);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const values = {
    fetchThreads,
    deleteThread,
    threads,
    categories,
    fetchForums,
    forums,
  };
  return (
    <ForumContext.Provider value={values}>
      {props.children}
    </ForumContext.Provider>
  );
};
export default ForumContextProvider;
