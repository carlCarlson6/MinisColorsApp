import React from 'react';
import { PaintController } from '../../controllers/PaintController';

const PaintContext = React.createContext<PaintController>({} as PaintController);

export default PaintContext;