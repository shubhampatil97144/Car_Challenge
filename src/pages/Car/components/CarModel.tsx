import React, { useEffect, useState } from "react";
import ProgressBar from "../../utils/ProgressBar";
import { ContainerClass, SubContainerClass, TYPE2 } from "../../utils/constant";
import CustomBlock from "../../Common/CustomBlock";

interface ModelCar {
  carData: any;
}
interface useStateData {
  valid:any
  mismatched:any
  missing:any
}
const ModelCar : React.FC<ModelCar> = ({ carData }) => {
  
  const [valid, setValid] = useState<useStateData[]>([]);
  const [mismatched, setMismatched] = useState<useStateData[]>([]);
  const [missing, setMissing] = useState<useStateData[]>([]);
  const [defaultCarData, setDefaultCarData] = useState<any>([]);
  const [modelList, setModelList] = useState<object>({});

  useEffect(() => {
    // Arrange the data when the value in dependies changed
    // Vehicle Model List
    if(carData){
      const missingData : useStateData[] = [];
      const mismatchedData : useStateData[] = [];
      const validData : any= [];
      const modelListData : any = {};
  
      /* FILTER THE ACCURATE DATA */
      // Finding Total Models and their length
      carData?.map((data : any) => {
  
        const previousValue = modelListData[data[TYPE2]];
        previousValue === undefined ?  modelListData[data[TYPE2]] = 1 : modelListData[data[TYPE2]] = previousValue + 1;
  
        if (data[TYPE2] == undefined || null || "") {
        // adding key and value
        // If the value is not exist then create new value
          missingData.push(data[TYPE2]);
        } else if (typeof data[TYPE2] != "string") {
          mismatchedData.push(data[TYPE2]);
        } else {
          validData.push(data[TYPE2]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
      setModelList(modelListData);
       // top2 data
       // Finding top2 Model's list
       /* GET INITIAL TWO ELEMENTS */
      if (Object.keys(modelListData).length > 0) {
        const top2 : any = Object.entries(modelListData)
          .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
          .slice(0, 1)
          .map(([label, value]) => ({ label, value }));
        setDefaultCarData(top2);
      }      
    }
  }, [carData]);

  return (
    <div className={ContainerClass}>
      <div className={SubContainerClass}>
        <CustomBlock title={"A. Model"} subTitle={"Car Model"} />

        <div className="mt-5">
          <div className="fs-1 fw-bold text-primary">
            {Object.keys(modelList).length}
          </div>
          <div className="fw-bold">unique values</div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressBar
          carData={carData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          defaultCarData={defaultCarData}
          unique={Object.keys(modelList).length}
        />
      </div>
    </div>
  );
};

export default ModelCar;
