// https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin
const pluginMoudleFactory = ({ typescript }) => {

  const pluginModule = {
    create: ({ config, project, languageService, languageServiceHost, serverHost }) => {

      const refactorName = 'ts-refactor';
      const refactorDescription = 'this is a ts refactor';

      // 注册一个 refactor
      typescript.refactor.registerRefactor(refactorName, {

        // 有哪些 action
        getAvailableActions(context) {
          const actionName = 'action';
          const actionDescription = 'some description';

          return [
            {
              name: refactorName,
              description: refactorDescription,
              actions: [
                {
                  name: actionName,
                  description: actionDescription,
                },
              ],

              // inlineable 为 false，才会显示 refactor description
              inlineable: false,
            },
          ];
        },

        // 选中指定 action 后，如何修改文档
        getEditsForAction(context, actionName) {
          const edits = typescript.textChanges.ChangeTracker.with(context, changeTracker => {
            const {
              file,
              file: { pos, end },
            } = context;

            changeTracker.replaceRangeWithText(file, { pos, end }, 'hello world');
          });

          return {
            edits,
          };
        },
      });
      return languageService;
    },
  };

  return pluginModule;
};

module.exports = pluginMoudleFactory;
