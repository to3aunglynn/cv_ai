import api from './axiosConfig';

const analyzeCV = async (cvText, jobDescription) => {

    const response = await api.post('/api/analyze', {
        cv_text: cvText,
        job_description: jobDescription
    });
    
    return response.data;
};

export default analyzeCV;