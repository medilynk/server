
const gen_uid = (digits) => {
    const min = 10 ** (digits - 1);
    const max = 10 ** digits - 1;
    let year = new Date().getFullYear();
    year = year % 100;
    const num = Math.floor(min + Math.random() * (max - min + 1));
    return `${year}/${num}`;
};

export const gen_doctor_id = async () => {
    const uid = gen_uid(5);
    return `D/${uid}`
};

export const gen_patient_id = () => {
    const uid = gen_uid(8);
    return `P/${uid}`;
};

export const gen_staff_id = () => {
    const uid = gen_uid(5);
    return `S/${uid}`;
};

export const get_nurse_id = () => {
    const uid = gen_uid(5);
    return `N/${uid}`;
}

export const gen_appointment_id = () => {
    const uid = gen_uid(10);
    return `A/${uid}`;
}

export const gen_prescription_id = () => {
    const uid = gen_uid(10);
    return `PRES/${uid}`;
}
