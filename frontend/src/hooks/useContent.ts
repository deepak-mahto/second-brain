import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export function useContent(type?: "tweet" | "video") {
  const [contents, setContents] = useState([]);

  function refresh() {
    let url = `${BACKEND_URL}/api/v1/content`;

    if (type) {
      url += `?type=${type}`;
    }

    axios
      .get(url, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();
    let interval = setInterval(() => {
      refresh();
    }, 10 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [type]);

  return { contents, refresh };
}
