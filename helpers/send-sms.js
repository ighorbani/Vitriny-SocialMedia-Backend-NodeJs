const Kaveh = require("kavenegar");

const kavehApi = Kaveh.KavenegarApi({
  apikey: '',
});

// FUNCTION FOR SENDING SMS
exports.sendSms = (content, number) => {
  kavehApi.Send(
    {
      message: content,
      sender: process.env.SMS_SENDER,
      receptor: number,
    },
    function (response, status) {
      // console.log("SMS Status: " + status);
    }
  );
};
