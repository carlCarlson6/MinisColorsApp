import React, { useState } from 'react';
import { HexColorPicker } from "react-colorful";

const ColorPicker: React.FC = (): JSX.Element => {
    const [color, setColor] = useState("#aabbcc");
    return <>
        <>{color}</>
        <HexColorPicker color={color} onChange={setColor} />
    </>;
}

export default ColorPicker;