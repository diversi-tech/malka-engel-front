import axios from "axios"
const API_BASE_URL = "https://localhost:7297/api/Email"
export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post("https://localhost:7297/api/Email/send", emailRequest)
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}


export const addEmail = async (newEmail) => {
  try {
    const responses = await Promise.all([
      axios.post("https://localhost:7297/api/Mailchimp/add-subscriber", {
        listId: "e1737e366f",
        email: newEmail.email,
        fName: newEmail.name
      }),
      axios.put("https://localhost:7297/api/Email/add-data", {
        name: newEmail.name,
        email: newEmail.email,
        message: newEmail.message
      })
    ]);
    return responses;
  } catch (error) {
    console.error('Error adding email:', error);
    throw error;
  }
};

export const SendEmails = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send-emails", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const send = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

//עבור שליחת מייל לכתובת אחת
export const sendEmails = async ({ Greeting, ToAddress, Subject, Body,IsBodyHtml = false , Attachments }) => {
  debugger
  try {
    const formData = new FormData();
    formData.append('Greeting', Greeting);
    formData.append('ToAddress', ToAddress);
    formData.append('Subject', Subject);
    formData.append('Body', Body);
    formData.append('IsBodyHtml', IsBodyHtml);
    Attachments.forEach((file, index) => {
      if (file) {
        formData.append(`Attachments`, file);
      }
    });

    const response = await axios.post("https://localhost:7297/api/Email/send", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Email sent successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export const sendEmailsPdfFile = async ({ Greeting, ToAddress, Subject, Body,IsBodyHtml = false , Attachments }) => {
  debugger
  try {
    const formData = new FormData();
    formData.append('Greeting', Greeting);
    formData.append('ToAddress', ToAddress);
    formData.append('Subject', Subject);
    formData.append('Body', Body);
    formData.append('IsBodyHtml', IsBodyHtml);
    Attachments.forEach((file, index) => {
      if (file) {
        formData.append(`Attachments`, file, "document.pdf");
      }
    });

    const response = await axios.post("https://localhost:7297/api/Email/send", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Email sent successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


export const postSendEmails = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send-emails", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};
export const SendEmailToReset = async (toAddress) => {
    try {
        debugger
        let  response = await axios.post(`${API_BASE_URL}/sendToResetPas?ToAddress=${toAddress.ToAddress}`);
        return response;

    } catch (error) {
        throw error;
    }
};




export const sendCampaign = async ({ Subject, HtmlContent }) => {
  try {
    const response = await axios.post("https://localhost:7297/api/Mailchimp/send-campaign", {
      Subject,
      HtmlContent
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Campaign sent successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending campaign:', error);
    throw error;
  }
}




export const getMessage = async () => {
  try {
      let result = await axios.get("https://localhost:7297/api/Messages/get-all-messages");
      return result.data;
  } catch (error) {
      console.log(error);
  }
}