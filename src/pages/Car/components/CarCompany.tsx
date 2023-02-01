import React, { useEffect, useState } from "react";
import CustomBlock from "../../Common/CustomBlock";
import { TYPE1, ContainerClass, SubContainerClass, CommonClass, ContentBetweenClass, FullWidth } from "../../utils/constant";
import ProgressBar from "../../utils/ProgressBar";

interface MakeCar {
  carData: any; 
}
interface useStateData {
  valid:any
  mismatched:any
  missing:any
}

const MakeCar : React.FC<MakeCar> = ({ carData }) => {
  
  const [valid, setValid] = useState<useStateData[]>([]); 
  const [mismatched, setMismatched] = useState<useStateData[]>([]);
  const [missing, setMissing] = useState<useStateData[]>([]);
  const [defaultCarData, setDefaultCarData] = useState<any>([]);
  const [other, setOther] = useState<number>(0);
  const [companyList, setCompanyList] = useState<object>({});

  
  useEffect(() => {
    // Arrange the data when the value in dependies changed
    // Vehicle Company List
    if(carData){
      const missingData  :useStateData[]= [];
      const mismatchedData :useStateData[]= [];
      const validData :any= [];
      const companies :any= {};
        
  
      carData?.map((data : any) => {
        // Finding Total Companies and their length
        const previousValue = companies[data[TYPE1]];
        previousValue === undefined ? companies[data[TYPE1]] = 1 : companies[data[TYPE1]] = previousValue + 1;
        
        if (data[TYPE1] == undefined || null || "") {
          missingData.push(data);
          // adding key and value
        // If the value is not exist then create new value
        } else if (typeof data[TYPE1] != "string") {
          mismatchedData.push(data);
        } else {
          validData.push(data[TYPE1]);
        }
      });
  
      setValid(validData);
      setMismatched(mismatchedData);
      setMissing(missingData);
       // Finding top2 Compnay's list
      setCompanyList(companies);
      
      /* GET INITIAL TWO ELEMENTS */
      if (Object.keys(companies).length > 0) {
        const objData :any = Object.entries(companies)
          .sort(({ 1: a }, { 1: b }) => Number(b) - Number(a))
          .slice(0, 2)
          .map(([label, value]) => ({ label, value }));
        
        setDefaultCarData(objData);
  
        const otherData = carData.length - objData[0]?.value - objData[1]?.value;
  
        setOther(otherData);
      }      
    }

  }, [carData]);

  return (
    <div className={ContainerClass}>
      <div className={SubContainerClass}>
        <CustomBlock title={"A. Model"} subTitle={"Compnay of the vehicle"} />
        <div className={CommonClass}>
          {carData && defaultCarData && (
            <div className={`${ContentBetweenClass} ${FullWidth}`}>
              <div>{defaultCarData[0]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[0]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          {carData && defaultCarData && (
            <div className={`${ContentBetweenClass} ${FullWidth}`}>
              <div>{defaultCarData[1]?.label}</div>
              <div className="fw-bold text-primary">
                {(
                  (defaultCarData[1]?.value * 100) /
                  carData.length
                ).toFixed(2)}
                %
              </div>
            </div>
          )}

          <div className={`${ContentBetweenClass} text-muted fs-6`}>
            <div>Other({Object.keys(companyList).length - 2})</div>
            <div>
              {carData &&
                other &&
                ((other * 100) / carData.length).toFixed(2)}
              %
            </div>
          </div>
        </div>
      </div>

      <div className="flex-2">
        <ProgressBar
          carData={carData}
          valid={valid}
          mismatched={mismatched}
          missing={missing}
          defaultCarData={defaultCarData}
          unique={Object.keys(companyList)?.length}
        />
      </div>
    </div>
  );
};

export default MakeCar;
