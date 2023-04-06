const constants = {
  pg: {
    tableName: {
      tbl_user_type: "tbl_user_type",
      tbl_user: "tbl_user",
    },
  },

  ERROR_CODES: {
    ASSET_NOT_FOUND: {
      code: "ASSET_NOT_FOUND",
      message: "Asset not found",
    },
    VLAN_NOT_FOUND: {
      code: "VLAN_NOT_FOUND",
      message: "VLAN not found",
    },
    SITE_INCHARGE_ALREADY_IN_USE: {
      code: "SITE_INCHARGE_ALREADY_IN_USE",
      message: "Site incharge is already linked to some site",
    },
    INVALID_TRANSACTION_ID: {
      code: "INVALID_TRANSACTION_ID",
      message: "Transaction ID does not exist",
    },
    ACCESS_DENIED: {
      code: "ACCESS_DENIED",
      message: "Access denied",
    },
    SERVER_ERROR: {
      code: "SERVER_ERROR",
      message: "Server error",
    },
    USER_AUTH_TOKEN_NOT_FOUND: {
      code: "USER_AUTH_TOKEN_NOT_FOUND",
      message: "User auth token not found",
    },
    USER_AUTH_TOKEN_EXPIRED: {
      code: "USER_AUTH_TOKEN_EXPIRED",
      message: "User auth token expired",
    },
  },

  RIDE_STATUS: {
    TERMINATED: 0,
    RIDING: 1,
    PAUSED: 2,
    ENDED: 3,
  },

  WALLET_BALANCE_THRESHOLD: 10,

  VEHICLE_STATUS: {
    MAINTAINANCE: 0,
    READY: 1,
    RIDING: 2,
    PAUSED: 3,
  },
  TRANSACTION_STATUS: {
    DEFAULT: 0,
    PENDING: 1,
    SUCCESS: 2,
    FAILED: 3,
    CANCELLED: 4,
  },
  PAYMENT_TRANSACTION_STATUS: {
    DEFAULT: 0,
    CREATED: 1,
    PENDING: 2,
    SUCCESS: 3,
    FAILED: 4,
    CANCELLED: 5,
    REQUIRES_ACTION: 6,
  },
  RIDE_CHARGES: {
    UNLOCK_CHARGE: 10,
    PAUSE_TIME_CHARGE: 5,
    RIDE_TIME_CHARGE: 10,
    RIDE_CHARGE_PER_MINUTE: [
      { min_minutes: 0, charge: 60 },
      { min_minutes: 1, charge: 50 },
      { min_minutes: 3, charge: 40 },
      { min_minutes: 6, charge: 30 },
    ],
  },
  GRIN_WALLET_ID: 0,
  OUTSTATION_CHARGE: 20,
  OUTSTATION_THRESHOLD: 15,
  OUTSTATION_ID: 0,
  VAT: 0.18,
  PAYMENT_TYPE: {
    RIDE_PAYMENT: "RIDE_PAYMENT",
    SUBSCRIPTION_PAYMENT: "SUBSCRIPTION_PAYMENT",
  },
  RIDE_HISTORY_PAGE_SIZE: 10,
  STRIPE_PAYMENT_STATUS_CODE: {
    SUCCEEDED: "succeeded",
    REQUIRES_ACTION: "requires_action",
    REQUIRES_CONFIRMATION: "requires_confirmation",
    REQUIRES_PAYMENT_METHOD: "requires_payment_method",
  },

  SOCKET_EVENTS: {
    ON_VEHICLES_UPDATE: "ON_VEHICLES_UPDATE",
    ON_STATIONS_UPDATE: "ON_STATIONS_UPDATE",
    ON_CURRENT_RIDE_UPDATE: "ON_CURRENT_RIDE_UPDATE",
    ON_USER_UPDATE: "ON_USER_UPDATE",
    ON_WALLET_UPDATE: "ON_WALLET_UPDATE",
    ON_CURRENT_PAYMENT_UPDATE: "ON_CURRENT_PAYMENT_UPDATE",
    ON_PAYMENT_TRANSACTION_UPDATE: "ON_PAYMENT_TRANSACTION_UPDATE",
  },
};

module.exports = constants;
