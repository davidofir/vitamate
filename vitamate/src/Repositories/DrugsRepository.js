
const baseUrl = 'https://api.fda.gov/drug/label.json?search=';
const findFieldByKeyContaining = (data, keyword) => {
    const key = Object.keys(data).find(key => key.toLowerCase().includes(keyword.toLowerCase()));
    return key ? data[key] : 'Not available';
};
export const fetchDrugs = async (drugName) => {
    const res = await fetch(`${baseUrl}${encodeURI(drugName)}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    const fetchedData = data.results[0]
    return {
        'name':drugName,
        'purpose': findFieldByKeyContaining(fetchedData, 'purpose'),
        'warnings': findFieldByKeyContaining(fetchedData, 'warnings'),
        'do not use': findFieldByKeyContaining(fetchedData, 'do_not_use'),
        'usage': findFieldByKeyContaining(fetchedData, 'indications_and_usage'),
        'dosage': findFieldByKeyContaining(fetchedData, 'dosage_and_administration'),
        'ask doctor': findFieldByKeyContaining(fetchedData, 'ask_doctor_or_pharmacist'),
        'questions': findFieldByKeyContaining(fetchedData, 'questions')
    }
};
export const fetchExistingDrugs = async (drugName) =>{
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/drug/${drugName}`);
    if(res.ok){
        return await res.json();
        
    }else{
        return null;
    }
}
export const persistDrugData = async (data) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/drug`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data
            })
        });

        if (res.ok) {
            console.log('Drug created successfully.');
        } else {
            console.error('Failed to create drug.');
            const errorResponse = await res.json();
            console.error(errorResponse);
        }
    } catch (error) {
        console.error('Error persisting drug:', error);
    }
};