const dbTimeToUtcTimestamp = (date) => {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
};

module.exports = { dbTimeToUtcTimestamp };
