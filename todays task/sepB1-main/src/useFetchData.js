import { useEffect, useState } from "react";
import axios from "axios";

function useFetchData(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(url, { signal: controller.signal });
        setData(response.data);
      } catch (requestError) {
        if (requestError.name !== "CanceledError") {
          setError("Unable to load the user directory. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetchData;
