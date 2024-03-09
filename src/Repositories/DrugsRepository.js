
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
    console.log(fetchedData)
    return {
        'purpose': findFieldByKeyContaining(fetchedData, 'purpose'),
        'warnings': findFieldByKeyContaining(fetchedData, 'warnings'),
        'do not use': findFieldByKeyContaining(fetchedData, 'do_not_use'),
        'usage': findFieldByKeyContaining(fetchedData, 'indications_and_usage'),
        'dosage': findFieldByKeyContaining(fetchedData, 'dosage_and_administration'),
        'ask doctor': findFieldByKeyContaining(fetchedData, 'ask_doctor_or_pharmacist'),
        'questions': findFieldByKeyContaining(fetchedData, 'questions')
    }
};
