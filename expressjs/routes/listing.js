const router = require("express").Router();
const varified = require("../routes/verifyToken");
const Listing = require("../model/Listing");
// post new Listing
router.post("/",varified , async (req , res) => {
 
  const listing = new Listing({
    
    title: req.body.title,
    price:req.body.price,
    locality:req.body.locality,
    details:req.body.details
  });
  res.send(listing);
    try {
            const saveListing = await listing.save();
            res.send(saveListing);
    } catch (error) {
        res.status(400).send(error);
    }

});
// Get ALL LIsting
router.get("/", async (req , res) => {
    try {
        const listing = await Listing.find();
        res.json(listing);
        
    } catch (error) {
        res.json({message:error})
    }
});
// single Listing
router.get("/:listingid", async (req , res) => {

    try {
        const listing = await Listing.findById(req.params.listingid);
        res.json(listing);
        
    } catch (error) {
        res.json({message:error})
    } 

});
// update Listing
router.put("/:listingid", varified, async(req , res) => {
    try {
        const listing = {
    
            title: req.body.title,
            price:req.body.price,
            locality:req.body.locality,
            details:req.body.details
          };

          const UpdatedListing = await Listing.findByIdAndUpdate({_id: req.params.listingid}, listing);
          res.json(UpdatedListing); 
    } catch (error) {
        res.json({message:error})
    } 

});
// Delete Listing
router.delete("/:listingid", varified,  async (req , res) => {
    try {
        const removelisting = await Listing.findByIdAndDelete(req.params.listingid);
        res.json(removelisting);
        
    } catch (error) {
        res.json({message:error})
    } 
});
module.exports = router;

