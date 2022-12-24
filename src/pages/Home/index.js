import { useState } from 'react';
import { DefaultLayout } from '~/components/layouts';
import Content from '~/components/layouts/components/Content';

function Home() {
    const [state, setState] = useState([]);
    return <Content />;
}
export default Home;
