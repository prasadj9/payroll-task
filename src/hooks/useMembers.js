import { useState, useEffect } from "react";
import { privateRequest } from "../services/privateRequest";

const useMembers = (searchTerm) => {
  const [members, setMembers] = useState([]);
  const [from, setFrom] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFrom(1);
    fetchMembers(1, searchTerm, true);
  }, [searchTerm]);

  const fetchMembers = async (start, search = "", reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await privateRequest.get(
        `/CompanyMembers?from=${start}&text=${search}&to=${start + 9}`
      );
      const fetchedMembers =  response.data?.data?.Members || []
      setMembers((prev) => (reset ? fetchedMembers : [...prev, ...fetchedMembers]));
      setFrom(start + 10);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreMembers = () => {
    fetchMembers(from, searchTerm);
  };

  return { members, fetchMoreMembers, loading };
};

export default useMembers;
