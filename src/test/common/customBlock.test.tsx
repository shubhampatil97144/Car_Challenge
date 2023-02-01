import CustomBlock from "../../pages/Common/CustomBlock";
import { render } from '@testing-library/react';

test('renders learn react link', () => {
    render(<CustomBlock title={"A. Model"} subTitle={"Compnay of the vehicle"} />)
});
