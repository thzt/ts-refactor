const fs = require('fs');
const path = require('path');

// 生成 tsconfig.json，因为 pluginPath 必须是绝对路径
const install = () => {
  const pluginPath = path.join(__dirname, '../');
  const tsConfigFilePath = path.join(__dirname, '../tsconfig.json');

  const tsConfig = {
    compilerOptions: {
      plugins: [
        {
          name: pluginPath,
        }
      ],
    },
  };
  const content = JSON.stringify(tsConfig, null, 2);

  fs.writeFileSync(tsConfigFilePath, content, 'utf-8');
};

install();
