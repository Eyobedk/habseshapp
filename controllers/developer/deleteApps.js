const {Apps,AppExplictActions} = require('../../models/App')
const rimraf = require("rimraf");
const fs = require('fs');
const deleteMessage = "Your publushed App is removed from the platform"



exports.deleteAppsRoute = async (req, res) => {
    // const TheAppClass = new Apps(res.locals.dev.id,req.params.id);
    const ExpApp = new AppExplictActions(req.params.id)
    await Promise.resolve(Apps.getAppsPath(req.params.id, res.locals.dev.id)).then( async (theApp)=>{

        let oldPublishedDate = theApp[0].publishedDate;
        let deleteDate = oldPublishedDate.setDate(oldPublishedDate.getDate() + 7)
        let today =new Date();

        if(new Date(deleteDate).getTime() < today.getTime())
        {
            rimraf.sync(`uploads/${theApp[0].appName}`);
            const result = await Promise.resolve(ExpApp.deleteApps()).catch(err =>{console.log(err)});
            if(result[0].affectedRows)
            {
                res.render("developer/appls/deleteApps", {deleteMessage:deleteMessage})
            }

            if(fs.existsSync(`updates/${theApp[0].appName}`))
            {
                rimraf.sync(`updates/${theApp[0].appName}`);
            }
        }else{
            let oneWeeklimit = "not enghough date"
            res.render("developer/appls/deleteApps", {oneWeeklimit:oneWeeklimit})
        }

    })
    
    

    
}



// async function deleteAppsRoute (TheAppId, DevId) {
//     const theResult = []
//     await Promise.resolve(Apps.getAppsPath(TheAppId, DevId)).then( async (theApp)=>{

//         let oldPublishedDate = theApp[0].publishedDate;
//         let deleteDate = oldPublishedDate.setDate(oldPublishedDate.getDate() + 7)
//         let today =new Date();

//         if(new Date(deleteDate).getTime() < today.getTime())
//         {
//             rimraf.sync(`uploads/${theApp[0].appName}`);
//             const result = await Promise.resolve(Apps.deleteApps(TheAppId, DevId)).catch(err =>{console.log(err)});
//             if(result[0].affectedRows)
//             {
//                 theResult.push("app row Affected")
//             }

//         }else{
//             theResult.push('date not enough')
//         }
//     })
//     return theResult[0];
// }

// module.exports = {deleteAppsRoute}