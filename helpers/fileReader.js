export default function(file) {
  return new Promise(
    (res, rej) => {
       const reader = new FileReader();

       reader.addEventListener(
         "load",
         function() {
           // convert image file to base64 string
           res(reader.result)
         },
         false
       );

       if (file) {
         reader.readAsDataURL(file);
       } else {
         rej(new Error('File not exist'))
       }
    },
  )
}
