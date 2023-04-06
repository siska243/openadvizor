import { env } from "./env.js";
import { httpRequest } from "./http.js";

$(document).ready(function () {
  //dropzone
  $(".dropify").dropify({
    messages: {
      default: "<span>Choisir un fichier </span>ou coller ici",
      replace: "Drag and drop or click to replace",
      remove: "Remove",
      error: "Ooops, something wrong happended.",
    },
  });
  var drEvent = $(".dropify").dropify();

  drEvent.on("dropify.beforeClear", function (event, element) {
    return confirm('Do you really want to delete "' + element.filename + '" ?');
  });

  //

  //formulaire
  $("#form").on("submit", function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var phone = $("#phone").val();
    var message = $("#message").val();
    var status = $("#status").val();

    if (!phone) {
      $("#phone").addClass("is-invalid");
      $("#validation-phone")
        .addClass("invalid-feedback")
        .text("Champs obligatoire");
      return;
    }
    if (phone.length < 10 || phone.length > 15) {
      $("#phone").addClass("is-invalid");
      $("#validation-phone")
        .addClass("invalid-feedback")
        .text("Le numéro de téléphone est incorrecte");
      return;
    }

    if (!message) {
      $("#message").addClass("is-invalid");
      $("#validation-message")
        .addClass("invalid-feedback")
        .text("Champs obligatoire");
      return;
    }
    if (message.length < 3) {
      $("").addClass("is-invalid");
      $("#validation-message")
        .addClass("invalid-feedback")
        .text("Le message est invalide");
      return;
    }
    $("#phone,#message").removeClass("is-invalid");

    const file = $("#file")[0].files[0];
    let imageUrl = "";
    if (file != undefined) {
      imageUrl = URL.createObjectURL(file);
    }
    Notiflix.Loading.hourglass("Veuillez patienter ....");
    
    const request = new httpRequest().sendMessage(phone, message, imageUrl);
    request
      .then((e) => {
        Notiflix.Loading.remove(1500);
        if (e.name == "AxiosError") {
          Notiflix.Report.failure(
            e.code,
            e.message,
            "Femer"
          );
        }
        else Notiflix.Report.success(
            "Succès",
            "Message envoyer avec succès",
            "Femer"
          );
      })
      .catch((e) => console.log(e));
  });
});
