import axios from "axios"
const API_BASE_URL2 = `${process.env.REACT_APP_API_URL}/api/`
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Email/`
const API_BASE_URL1 = `${process.env.REACT_APP_API_URL}/api/Mailchimp/`

export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post(`${API_BASE_URL}send`, emailRequest)
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
      axios.post(`${API_BASE_URL1}add-subscriber`, {
        listId: "e1737e366f",
        email: newEmail.email,
        fName: newEmail.name
      }),
      axios.put(`${API_BASE_URL}add-data`, {
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
        const response = await axios.post(`${API_BASE_URL}send-emails`, newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const send = async (newEmail) => {
    try {
        const response = await axios.post(`${API_BASE_URL}send`, newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

//עבור שליחת מייל לכתובת אחת
/*export const sendEmails = async ({ Greeting, ToAddress, Subject, Body,IsBodyHtml = false , Attachments }) => {
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

    const response = await axios.post(`${API_BASE_URL}send`, formData, {
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
};*/

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
    const response = await axios.post(`${API_BASE_URL}send`, formData, {
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

    const response = await axios.post(`${API_BASE_URL}send`, formData, {
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
        const response = await axios.post(`${API_BASE_URL}send-emails`, newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const SendEmailToReset = async (toAddress) => {
  try {
      let  response = await axios.post(`${API_BASE_URL}sendToResetPas?ToAddress=${toAddress.ToAddress}`);
      return response;
  } 
  catch (error) {
      throw error;
  }
};

export const sendEmailsForAllUsers = async ({ Greeting, Subject, Body, Attachments }) => {
    try {
      const formData = new FormData();
      formData.append('Greeting', Greeting);
    //   formData.append('ToAddress', ToAddress);
      formData.append('Subject', Subject);
      formData.append('Body', Body);
  
      Attachments.forEach((file, index) => {
        if (file) {
          formData.append(`Attachments`, file);
        }
      });
  
      const response = await axios.post(`${API_BASE_URL}send-emails`, formData, {
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
  }



export const getMessage = async () => {
  try {
      let result = await axios.get(`${process.env.REACT_APP_API_URL}/api/Messages/get-all-messages`);
      return result.data;
  } catch (error) {
      console.log(error);
  }
}

export const deleteMessage = async (messageId) => {
  try {
      const response = await axios.delete(`${API_BASE_URL2}Messages/delete-message/${messageId}`);

      return response;
  } catch (error) {
    console.error("Failed to delete message:", error.response ? error.response.data : error.message);
    throw error;
  }
};