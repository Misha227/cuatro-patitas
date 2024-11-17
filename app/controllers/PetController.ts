
const API_URL = 'http://127.0.0.1:5000/api/mascotas';
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
          'Accept': 'application/json',
        },
        mode: 'cors',  // Explicitly set CORS mode
        body: JSON.stringify(pet),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save pet to the API');
      }
  
      console.log('Pet saved successfully to the API');
    } catch (error) {
      console.error('Error saving pet to the API:', error);
      throw error;
    }
  };