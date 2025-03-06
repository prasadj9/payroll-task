import { useState, useEffect } from "react";
import { privateRequest } from "../services/privateRequest";

const useLeadMembers = () => {
  const [leadMembers, setLeadMembers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchLeadMembers = async () => {
      try {
        const response = await privateRequest.post("/CRM/Leads", {
            "From": 1,
            "To": -1,
            "Text": ""
        }); 
        // Extract only id and name from the API response
        const simplifiedMembers = response.data?.data?.Leads?.map((member) => ({
            id: member.Id,
            label: member.LeadName,
          }));
        setLeadMembers(simplifiedMembers || []); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchLeadMembers(); 
  }, []); 

  return { leadMembers, loading, error };
};

export default useLeadMembers;