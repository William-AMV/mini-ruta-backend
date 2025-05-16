import { BaseSeeder } from "@adonisjs/lucid/seeders";
import Place from "#models/place";

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Place.createMany([
      { name: 'Plaza 10 de Febrero (Centro, punto principal)', linkPlace: null },
      { name: 'Mercado Campero (Av. 6 de Agosto y Presidente Montes)', linkPlace: null },
      { name: 'Ex-Estación de Trenes (Av. 6 de Agosto)', linkPlace: null },
      { name: 'Cancha 1ro de Mayo (Av. 6 de Agosto)', linkPlace: null },
      { name: 'Villa Bolívar (Terminal, cerca del Parque de la Familia)', linkPlace: null },
      { name: 'Mercado Fermín López (Av. Cívica Sanjinés)', linkPlace: null },
      { name: 'Facultad Nacional de Ingeniería (FNI) (Ciudad Universitaria)', linkPlace: null },
      { name: 'Ciudad Universitaria (U.T.O., parada final)', linkPlace: null },
      { name: 'Mercado Negro (Av. España y Cochabamba)', linkPlace: null },
      { name: 'Plaza del Folklore (Av. España)', linkPlace: null },
      { name: 'Estadio Jesús Bermúdez (Av. España y Pagador)', linkPlace: null },
      { name: 'Barrio Pagador (zona del cementerio)', linkPlace: null },
      { name: 'Av. 6 de Octubre (Colegio Alemán, Bajo Pagador)', linkPlace: null },
      { name: 'Bajo Pagador (zona sur, calles aledañas al Estadio)', linkPlace: null },
      { name: 'Av. del Maestro (Colegio Simón Bolívar)', linkPlace: null },
      { name: 'Barrio San Pedro (zona hospital San Pedro)', linkPlace: null },
      { name: 'Ventarrón (cerca del matadero, sur extremo)', linkPlace: null },
      { name: 'Mercado Abaroa (Av. Ejército)', linkPlace: null },
      { name: 'Barrio Sepulturas (Av. Ejército y calles aledañas)', linkPlace: null },
      { name: 'El Choro (Distrito Minero, norte)', linkPlace: null },
      { name: 'Barrio Huajara (zona UPEA, Av. San Martín)', linkPlace: null },
      { name: 'La Ranchería (cerca del Regimiento, Av. Brasil)', linkPlace: null },
      { name: 'Facultad de Medicina (U.T.O.)', linkPlace: null },
      { name: 'Facultad de Agronomía', linkPlace: null },
      { name: 'Instituto Tecnológico Oruro (ITO)', linkPlace: null },
      { name: 'Barrio Obrero (Av. Aroma)', linkPlace: null },
      { name: 'Barrio 10 de Febrero (cerca del Colegio Don Bosco)', linkPlace: null },
    ]);
  }  
}

