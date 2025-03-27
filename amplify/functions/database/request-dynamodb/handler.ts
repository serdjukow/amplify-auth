import { Handler } from "aws-lambda";
import {
  getItemsOfTable,
  removeAttributeOfItem,
  updateMultipleItems,
} from "../../../data/utils";
import { UpdateAttribute } from "../../../types";
import { chunkArray } from "../../../utils";

const ITEMS_REQUEST_LIMIT = 10000;

export const updateItemsByFixedValues = async () => {
  const tableName = "Product";
  const attributeToFilterUnupdatedItems = "isActive";
  const updates: UpdateAttribute[] = [
    { attributeName: "isActive", newValue: false },
    { attributeName: "test", newValue: 12 },
  ];

  try {
    let token;
    const allDataList = [];
    let scannedCountTotal = 0;
    let timeTotal = 0;

    do {
      // const dataList = await getAllItemsOfTable(tableName, attributeName);
      const { dataList, nextToken, scannedCount, timeTaken } =
        await getItemsOfTable(
          tableName,
          "attribute_not_exists",
          attributeToFilterUnupdatedItems,
          ITEMS_REQUEST_LIMIT,
          token,
        );

      token = nextToken;
      scannedCountTotal += scannedCount;
      timeTotal += timeTaken;

      // console.log("dataList.length: ", dataList.length);
      console.log("scannedCountTotal: ", scannedCountTotal);
      console.log("allDataList.length: ", allDataList.length);
      console.log("timeTotal: ", timeTotal);
      // console.log("dataList[0]: ", dataList[0]);

      allDataList.push(...dataList);

      const dataChunks = chunkArray(dataList, 50);

      for (const chunk of dataChunks) {
        // const start = new Date().getTime();
        const updateItemPromises = chunk.map((tableItem) =>
          updateMultipleItems(tableName, tableItem.id.S, updates),
        );

        await Promise.all(updateItemPromises);
        // const end = new Date().getTime();
        // console.log(
        //   "Time taken to update 50 items: ",
        //   ((end - start) / 1000).toFixed(2),
        // );
      }
    } while (token);

    // console.log("allDataList: ", allDataList);
  } catch (err) {
    console.log("Error occurred...");
    console.log(err);
  }
};

export const updateProducts = async () => {
  const tableName = "Product";
  const attributeToFilterUnupdatedItems = "priceOldStore";

  try {
    const { dataList, scannedCount, timeTaken } = await getItemsOfTable(
      tableName,
      "attribute_not_exists",
      attributeToFilterUnupdatedItems,
    );

    // console.log("dataList.length: ", dataList.length);
    console.log("scannedCountTotal: ", scannedCount);
    console.log("allDataList.length: ", dataList.length);
    console.log("timeTotal: ", timeTaken);
    // console.log("dataList[0]: ", dataList[0]);

    const dataChunks = chunkArray(dataList, 50);

    for (const chunk of dataChunks) {
      // const start = new Date().getTime();
      const updateItemPromises = chunk.map((product) => {
        const price = product.price?.N;
        const priceOld = product.priceOld?.N;

        const updates: UpdateAttribute[] = [];

        if (price !== undefined && price !== null) {
          updates.push({ attributeName: "priceStore", newValue: price });
        }

        if (priceOld !== undefined && priceOld !== null) {
          updates.push({ attributeName: "priceOldStore", newValue: priceOld });
        }

        if (updates.length === 0) {
          return Promise.resolve();
        }

        return updateMultipleItems(tableName, product.id, updates);
      });

      await Promise.all(updateItemPromises);
      // const end = new Date().getTime();
      // console.log(
      //   "Time taken to update 50 items: ",
      //   ((end - start) / 1000).toFixed(2),
      // );
    }

    // console.log("allDataList: ", allDataList);
  } catch (err) {
    console.log("Error occurred...");
    console.log(err);
  }
};

export const updateExpansions = async () => {
  const tableName = "Expansion";
  const attributeToFilterUnupdatedItems = "isActive";

  try {
    const { dataList, scannedCount, timeTaken } = await getItemsOfTable(
      tableName,
      "attribute_not_exists",
      attributeToFilterUnupdatedItems,
    );

    // console.log("dataList.length: ", dataList.length);
    console.log("scannedCountTotal: ", scannedCount);
    console.log("allDataList.length: ", dataList.length);
    console.log("timeTotal: ", timeTaken);
    // console.log("dataList[0]: ", dataList[0]);

    const dataChunks = chunkArray(dataList, 50);

    for (const chunk of dataChunks) {
      // const start = new Date().getTime();
      const updateItemPromises = chunk.map((product) => {
        const englishName = product.localization.L.find(
          (loc: any) => loc.M.languageName.S === "English",
        );
        const germanName = product.localization.L.find(
          (loc: any) => loc.M.languageName.S === "German",
        );

        const expansionDeName = germanName.M.name.S;
        const expansionEnName = englishName.M.name.S;

        const isActive = product.isActive.BOOL;
        const alias = product.alias?.S;

        const updates: UpdateAttribute[] = [
          { attributeName: "expansionDeName", newValue: expansionDeName },
          { attributeName: "expansionEnName", newValue: expansionEnName },
          { attributeName: "isExpansionActive", newValue: isActive },
        ];

        if (alias) {
          updates.push({ attributeName: "expansionAlias", newValue: alias });
        }

        return updateMultipleItems(tableName, product.id.S, updates);
      });

      await Promise.all(updateItemPromises);
      // const end = new Date().getTime();
      // console.log(
      //   "Time taken to update 50 items: ",
      //   ((end - start) / 1000).toFixed(2),
      // );
    }

    // console.log("allDataList: ", allDataList);
  } catch (err) {
    console.log("Error occurred...");
    console.log(err);
  }
};

export const deleteProductsAttributes = async () => {
  const tableName = "Product";
  const attributeToFilterUnupdatedItems = "isActive";

  try {
    const { dataList, scannedCount, timeTaken } = await getItemsOfTable(
      tableName,
      "attribute_not_exists",
      attributeToFilterUnupdatedItems,
    );

    // console.log("dataList.length: ", dataList.length);
    console.log("scannedCountTotal: ", scannedCount);
    console.log("allDataList.length: ", dataList.length);
    console.log("timeTotal: ", timeTaken);
    // console.log("dataList[0]: ", dataList[0]);

    const dataChunks = chunkArray(dataList, 50);

    for (const chunk of dataChunks) {
      // const start = new Date().getTime();
      const updateItemPromises = chunk.flatMap((product) => [
        removeAttributeOfItem(tableName, product.id.S, "alias"),
        removeAttributeOfItem(tableName, product.id.S, "deName"),
        removeAttributeOfItem(tableName, product.id.S, "deShowName"),
        removeAttributeOfItem(tableName, product.id.S, "enName"),
        removeAttributeOfItem(tableName, product.id.S, "expansionDeName"),
        removeAttributeOfItem(tableName, product.id.S, "expansionEnName"),
        removeAttributeOfItem(tableName, product.id.S, "expansionIcon"),
        removeAttributeOfItem(tableName, product.id.S, "expansionName"),
        removeAttributeOfItem(tableName, product.id.S, "gameName"),
        removeAttributeOfItem(tableName, product.id.S, "idExpansion"),
        removeAttributeOfItem(tableName, product.id.S, "idGame"),
        removeAttributeOfItem(tableName, product.id.S, "isActive"),
        removeAttributeOfItem(tableName, product.id.S, "localization"),
        removeAttributeOfItem(tableName, product.id.S, "folderChange2"),
      ]);

      await Promise.all(updateItemPromises);
      // const end = new Date().getTime();
      // console.log(
      //   "Time taken to update 50 items: ",
      //   ((end - start) / 1000).toFixed(2),
      // );
    }

    // console.log("allDataList: ", allDataList);
  } catch (err) {
    console.log("Error occurred...");
    console.log(err);
  }
};

export const handler: Handler = async () => {
  // const start = new Date().getTime();
  // const items = await getItemsOfTable("Product", "isActive");
  // console.log("items: ", items);
  // const end = new Date().getTime();

  // console.log("Time taken: ", (end - start) / 1000 + "s");

  // await saveItemsToS3(items.dataList);

  // return items;

  const start = new Date().getTime();

  await updateProducts();

  const end = new Date().getTime();

  console.log("Time taken: ", (end - start) / 1000 + "s");
};
