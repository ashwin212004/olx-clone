import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Cancel() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("Payment is not successfully done");
    navigate('/');
  }, [navigate]);
}

export default Cancel;