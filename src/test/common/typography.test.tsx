import Typography from "../../pages/Common/Typography";
import { render } from '@testing-library/react';

test('renders learn react link', () => {
    render(<Typography title={"Valid"} length={'10'} percentage={"10%"} type={"success"} />)
});
