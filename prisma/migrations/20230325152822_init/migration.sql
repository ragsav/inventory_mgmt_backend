-- CreateTable
CREATE TABLE "tblSite" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "sicID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pincode" VARCHAR,
    "address" VARCHAR,

    CONSTRAINT "tblSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblAsset" (
    "id" SERIAL NOT NULL,
    "serialNumber" VARCHAR NOT NULL,
    "siteID" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "isOperational" BOOLEAN NOT NULL DEFAULT false,
    "note" VARCHAR,
    "isBuybackable" BOOLEAN NOT NULL DEFAULT false,
    "build" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "buybackedAt" TIMESTAMPTZ(6),
    "decomissionedAt" TIMESTAMPTZ(6),

    CONSTRAINT "tblAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblAssetType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "oem" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "build" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tblAssetType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblSiteIncharge" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbl_site_engineer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblVLAN" (
    "id" SERIAL NOT NULL,
    "siteID" INTEGER NOT NULL,
    "IP" VARCHAR NOT NULL,
    "tag" VARCHAR NOT NULL,
    "subnet" VARCHAR NOT NULL,
    "gateway" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "VLANID" INTEGER NOT NULL,

    CONSTRAINT "tblVLAN_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblVLANAssetMap" (
    "id" SERIAL NOT NULL,
    "VLANID" INTEGER NOT NULL,
    "assetID" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tblVLANAssetMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblUserTypes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "isDisabled" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabledAt" TIMESTAMPTZ(6),
    "disableReason" VARCHAR,

    CONSTRAINT "tblUserTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tblUsers" (
    "id" SERIAL NOT NULL,
    "firebaseID" VARCHAR(128) NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    "isDisabled" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disabledAt" TIMESTAMPTZ(6),
    "disableReason" VARCHAR,
    "userTypeID" INTEGER NOT NULL,

    CONSTRAINT "tblUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tblSite" ADD CONSTRAINT "fk_tbl_site_sic_id_tbl_site_incharge_id" FOREIGN KEY ("sicID") REFERENCES "tblSiteIncharge"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblAsset" ADD CONSTRAINT "fk_tbl_asset_site_id_tbl_site_id" FOREIGN KEY ("siteID") REFERENCES "tblSite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblAsset" ADD CONSTRAINT "fk_tbl_asset_type_tbl_asset_type_id" FOREIGN KEY ("type") REFERENCES "tblAssetType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblVLAN" ADD CONSTRAINT "fk_tbl_vlan_site_id_tbl_site_id" FOREIGN KEY ("siteID") REFERENCES "tblSite"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblVLANAssetMap" ADD CONSTRAINT "fk_tbl_vlan_asset_map_asset_id_tbl_asset_id" FOREIGN KEY ("assetID") REFERENCES "tblAsset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblVLANAssetMap" ADD CONSTRAINT "fk_tbl_vlan_asset_map_vlan_id_tbl_vlan_id" FOREIGN KEY ("VLANID") REFERENCES "tblVLAN"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tblUsers" ADD CONSTRAINT "fk_tbl_users_tbl_user_types_id" FOREIGN KEY ("userTypeID") REFERENCES "tblUserTypes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
