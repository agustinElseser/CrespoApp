export const data= [
    {
        id: '1',
        content: 'Sometimes life is scary and dark',
        author: 'BMO',
      },
      {
        id: '2',
        content:
          'Sucking at something is the first step towards being sorta good at something.',
        author: 'jake',
      },
      {
        id: '3',
        content: "You got to focus on what's real, man",
        author: 'jake',
      },
      {
        id: '4',
        content: 'Is that where creativity comes from? From sad biz?',
        author: 'finn',
      }
]
 //Funcion para generar id randoms para mocks
export const  generarID = () => {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    const longitud = 8; // Puedes ajustar la longitud del ID según tus necesidades
  
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      id += caracteres.charAt(indiceAleatorio);
    }
  
    return id;
  }

  //Funcion para validar si el objeto esta vacio
  export const objectVacio = (obj) => {
    for (const clave in obj) {
      if (obj.hasOwnProperty(clave)) {
        return false;
      }
    }

    return true
  }

  export const items = [{id:'01',title:'Documento', text:'¿Podrias dejarme tu número de documento?'}, {id:'02',title:'Disponibilidad', text:'¿En qué horario prefieres que te llamemos?'}]
  export const intentions = [
    {id:'I01',title:'MIA', text:'MIA Bot es un sistema de llamadas que permite realizar llamadas simultáneas, tanto entrantes como salientes, mediante el uso de nuestro motor de procesamiento de lenguaje natural.', words: [{id:'w05', text:'mia'}, {id:'w06', text:'bot'}, {id:'w07', text:'llamadas'}]},
    {id:'I02',title:'Mailing', text:'Mailing te permite crear y enviar campañas de correo masivo utilizando plantillas personalizadas.', words:[{id:'w01', text:'mail'}, {id:'w02', text:'emviar mails'},{id:'w03', text:'mailing'}, {id:'w04', text:'campañas'}  ]},
    {id:'I03',title:'SMS', text:'SMS te permite enviar campañas masivas para brindar información a tus clientes.', words:[{id:'w08', text:'SMS'},{id:'w09', text:'mensajes'}]}
    ]
