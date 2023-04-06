class Logger {
  static pageLogger = (page, obj) => {
    obj ? console.log(`-----> : ${page} |=====|`, { obj }) : console.log(`-----> : ${page}`);
  };

  static log = (status = "INFO", { message, params }) => {
    params ? console.log(`${String(status).toUpperCase()}-----> : ${message} |=====|`, { params }) : console.log(`${String(status).toUpperCase()}-----> : ${message}`);
  };
}

module.exports = Logger;
