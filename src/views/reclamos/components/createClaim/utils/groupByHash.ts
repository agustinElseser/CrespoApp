import { IMetadataHash } from "../steps/DataUser";

export interface GroupByHash {
  (audios: any): IMetadataHash[];
}

const groupByHash: GroupByHash = (audios) => {
  return Object.values(
    audios.reduce((acc: { [key: string]: IMetadataHash }, audio: any) => {
      const { id, hash_metadata, nombre_audio, nombre, fecha } = audio;

      if (!acc[hash_metadata]) {
        acc[hash_metadata] = {
          nombre: nombre,
          hash_metadata: hash_metadata,
          fecha: fecha,
          metadata: [],
        };
      }

      acc[hash_metadata].metadata.push({
        id_metadata: id,
        nombre_audio: nombre_audio,
      });

      return acc;
    }, {})
  );
};

export default groupByHash;
