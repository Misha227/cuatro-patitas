
const API_URL = 'http://127.0.0.1:5000/api/mascotas';
type TipoMascota = 'perro' | 'gato';
type TipoComida = 'seca' | 'humeda' | 'mixta';
interface Mascota {
    pet: any;
    id: number;
    nombre: string;
    tipo: TipoMascota;
    raza: string;
    peso: string;
    edad: string;
    tipoComida: TipoComida;
  }


export const savePetToApi = async (pet: Omit<Mascota, 'id'>): Promise<Mascota> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pet),
  });

  if (!response.ok) {
    throw new Error('Failed to save pet');
  }
  const savedPet: Mascota = await response.json();
  
  return savedPet; 
};