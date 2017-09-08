import express from "express";
import Show from "../models/show";
const User = require("../models/user");
const renderTemplate = require("../util/renderTemplate");
const requireLoggedIn = require("../middleware/requireLoggedIn");
const bodyParser = require("body-parser");
const request = require("request");

const router = express.Router();

router.use(bodyParser.json());
const url = "http://api.tvmaze.com/search/shows?q=";
// request({
// url: url,
// json: true,
// }, function (error, response, body) {
//
//     if (!error && response.statusCode === 200) {
//         console.log(body); // Print the json response
//     }
// });

router.get('/search', function(req, res) {
  request({
    url: url+req.query.q,
    json: true,
  }, function(error, response, body) {
     console.log(body);
      if(error) {
        res.send("FIX IT");
      }
      if (!error && response.statusCode === 200) {
        res.json({
          data: body
        });
        // res.send();

//         renderTemplate(req, res, "Search", "search", {
//       name: body.network["name"],
//       message: "SHOW TIME",
//       body,
//         // console.log(body); // Print the json response
// });
// console.log(body.network["name"], "PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
    }
  });
});

module.exports = router;
