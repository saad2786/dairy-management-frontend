export const calcaulteTotal = (trasactions) =>{
        const mornQty = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.MornQty__c;
            return sum 
        },0).toFixed(2)
        const evenQty = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.EvenQty__c;
            return sum
        },0).toFixed(2)
        const mornPrice = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.MornPrice__c;
            return sum
        },0).toFixed(2)
        const evenPrice = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.EvenPrice__c;
            return sum
        },0).toFixed(2)
        const totalQty = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.TotalQty__c;
            return sum
        },0).toFixed(2)
        const totalPrice = trasactions.reduce((sum, trasaction)=>{
            sum += trasaction.TotalPrice__c;
            return sum
        },0).toFixed(2)
        return { mornPrice, mornQty, evenPrice, evenQty, totalPrice, totalQty}
}