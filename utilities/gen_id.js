import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

function generateRandomNumber(){
    const random = Math.floor(10000 + Math.random()*90000)
    return random;
}

    const gen_id = async ()=>{
    let isUnique = false;
    let id;
    while(!isUnique){
        const year = new Date().getFullYear();
        const randomNum = generateRandomNumber();
        id = `DR/${year}/${randomNum}`;

        const existing_doctor = await prisma.doctor.findUnique({
            where:{
                id:id
            }
        });

        if(!existing_doctor){
            isUnique = true;
        }
    }

    return id;
}

export default gen_id;