import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product";
import axios from "axios";
const app = express();
dotenv.config();
const portnumber = process.env.PORT;
const url = process.env.DB_URL!;

const connectToMongo = async () => {
  try {
    await mongoose.connect(url);
    console.log("Mongo connected successfully");
  } catch (error) {
    console.log("Mongo did not connect");
  }
};

connectToMongo();

app.get("/", (req, res) => {
  res.send("Hi niranjan");
});

app.get("/start", async (req, res) => {
  try {
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const productList = await response.json();
    await Product.insertMany(productList);
    res.status(200).json({
      msg: "Scuccess",
    });
  } catch (error) {
    res.status(404).json({
      msg: "Error happened during initialising database.",
    });
  }
});

app.get(`/product/:page`, async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const last = page * 10;
    const first = last - 9;
    const data = await Product.find({
      id: {
        $gte: first,
        $lte: last,
      },
    });
    const total = await Product.countDocuments();
    res.status(200).json({
      data,
      total,
    });
  } catch (error) {
    res.status(404).json({
      msg: "failed to get products.",
    });
  }
});

app.get("/search/:query", async (req, res) => {
  try {
    const query: any = req.params.query;
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { desciption: { $regex: query, $options: "i" } },
        { price: parseInt(query) || null },
      ],
    });
    res.json({
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error" });
  }
});

app.get("/sale/:month", async (req, res) => {
  try {
    const month = parseInt(req.params.month);
    const saleData = await Product.aggregate([
      {
        $addFields: {
          monthOfSale: { $month: "$dateOfSale" },
        },
      },
      {
        $match: {
          monthOfSale: month,
        },
      },
      {
        $group: {
          _id: null,
          totalSold: {
            $sum: {
              $cond: [{ $eq: ["$sold", true] }, 1, 0],
            },
          },
          totalUnsold: {
            $sum: {
              $cond: [{ $eq: ["$sold", false] }, 1, 0],
            },
          },
          totalSales: {
            $sum: {
              $cond: [{ $eq: ["$sold", true] }, "$price", 0],
            },
          },
          saleData: { $push: "$$ROOT" },
        },
      },
    ]);

    if (saleData.length > 0) {
      res.json({
        saleData: saleData[0].saleData,
        totalSold: saleData[0].totalSold,
        totalUnsold: saleData[0].totalUnsold,
        totalSales: saleData[0].totalSales,
      });
    } else {
      res.json({
        saleData: [],
        totalSold: 0,
        totalUnsold: 0,
        totalSales: 0,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error" });
  }
});

app.get('/bar/:month', async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const priceRangeData = await Product.aggregate([
            {
                $addFields: {
                    monthOfSale: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    monthOfSale: month
                }
            },
            {
                $bucket: {
                    groupBy: "$price",
                    boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901],
                    default: "901-above",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]);

        res.json(priceRangeData);
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error" });
    }
});

app.get('/pie/:month', async (req, res) => {
    try {
        const month = parseInt(req.params.month);
        const categoryData = await Product.aggregate([
            {
                $addFields: {
                    monthOfSale: { $month: "$dateOfSale" }
                }
            },
            {
                $match: {
                    monthOfSale: month
                }
            },
            {
                $group: {
                    _id: "$category",
                    itemCount: { $sum: 1 }
                }
            }
        ]);

        res.json(categoryData);
    } catch (error) {
        console.log(error);
        res.json({ msg: "Error" });
    }
});

app.get('/combine/:month',async (req,res)=>{
    const month =parseInt(req.params.month);
    const data1=await axios.get(`${process.env.ROOT_URL}/sale/${month}`);
    const data2=await axios.get(`${process.env.ROOT_URL}/bar/${month}`);
    const data3=await axios.get(`${process.env.ROOT_URL}/pie/${month}`);

    res.json({
        saleData:data1.data.saleData,
        barChartData:data2.data,
        pieChartData:data3.data
    });
})

app.listen(portnumber, () => console.log(`Listening on port ${portnumber}`));
