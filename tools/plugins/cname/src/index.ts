import { ParameterType, PluginHost, writeFile } from 'typedoc/dist/lib/utils';
import { RendererEvent } from 'typedoc/dist/lib/output/events';

export function load(host: PluginHost) {
  const app = host.application;

  app.options.addDeclaration({
    name: 'ghCname',
    help: 'CNAME Plugin: Github Pages CNAME',
    type: ParameterType.String,
    defaultValue: '',
  });

  app.renderer.once(RendererEvent.END, () => {
    const cName = app.options.getValue('ghCname') as string;
    const workingDir = process.cwd();
    const outDir = app.options.getValue('out') || './docs';

    writeFile(`${outDir}/CNAME`, cName, false);
  });
}
