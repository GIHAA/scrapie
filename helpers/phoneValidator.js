export function phoneValidator(phone) {
    const phoneRegex = /^\d{10}$/;
  
    if (!phone) {
      return "Phone number is required";
    }
  
    if (!phoneRegex.test(phone)) {
      return "Invalid phone number. Please use a 10-digit format (XXXXXXXXXX)";
    }
  
    return "";
  }
  