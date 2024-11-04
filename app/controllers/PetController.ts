
const API_URL = 'http://192.168.1.162:5000/api/mascotas';
type TipoMascota = 'perro' | 'gato';
type TipoComida = 'seca' | 'humeda' | 'mixta';
interface Mascota {
    id: number;
    nombre: string;
    tipo: TipoMascota;
    raza: string;
    peso: string;
    edad: string;
    tipoComida: TipoComida;
  }

export const savePetToApi = async (pet: Mascota): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pet),
    });

    if (!response.ok) {
      throw new Error('Failed to save pet to the API');
    }

    console.log('Pet saved successfully to the API');
  } catch (error) {
    console.error('Error saving pet to the API:', error);
    throw error;
  }
};