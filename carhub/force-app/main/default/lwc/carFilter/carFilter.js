import { LightningElement, wire } from 'lwc';
import {getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi'
import CAR_OBJECT from '@salesforce/schema/Car__c'

//car Schema
import CATEGORY__FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD  from '@salesforce/schema/Car__c.Make__c'

//constant
const CATEGORY_ERROR="Error loading categoies"
const MAKE_ERROR="Error loading make types"

export default class CarFilter extends LightningElement {
    filters={
        seachKey:'',
        maxPrice:999999
    }
    
    categoryError=CATEGORY_ERROR
    makeError=MAKE_ERROR

    /*** fetching category*/
     
    @wire(getObjectInfo,{objectApiName:CAR_OBJECT})
    carObjectInfo

    @wire(getPicklistValues,{
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId', 
        fieldApiName:CATEGORY__FIELD
     })categories

     /*** fetching Make picklist */
     @wire(getPicklistValues,{
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId', 
        fieldApiName:MAKE_FIELD
     })makeType

     /**search key handler */
    handleSearchKeyChange(event){
        console.log(event.target.value)
        this.filters={...this.filters,"seachKey":event.target.value}
    }

    /**Price change handler */
    handleMaxPriceChange(event){
        console.log(event.target.value)
        this.filters={...this.filters,"maxPrice":event.target.value}
    }

    handleCheckbox(event){
       const {name, value} =event.target.dataset
       console.log("name", value)
       console.log("value",value)
    }
} 