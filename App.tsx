import React, { useState } from "react";

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors?: string[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    model.paramValues || []
  );

  const handleChange = (paramId: number, value: string) => {
    setParamValues((prev) => {
      const existingParam = prev.find((p) => p.paramId === paramId);
      if (existingParam) {
        return prev.map((p) => (p.paramId === paramId ? { ...p, value } : p));
      } else {
        return [...prev, { paramId, value }];
      }
    });
  };

  const getModel = (): Model => {
    return { paramValues, colors: model.colors || [] };
  };

  return (
    <div>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}:</label>
          <input
            type="text"
            value={paramValues.find((p) => p.paramId === param.id)?.value || ""}
            onChange={(e) => handleChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => console.log(getModel())}>Get Model</button>
    </div>
  );
};

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [],
  };

  return <ParamEditor params={params} model={model} />;
};

export default App;
