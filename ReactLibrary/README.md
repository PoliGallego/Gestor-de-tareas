# @gestor-tareas/react-components

Librería de componentes reutilizables para React y TypeScript.

## Desarrollo

```bash
npm install
npm run build
```

El build genera JavaScript ESM, declaraciones TypeScript y CSS dentro de `dist/`.

## Uso en otra aplicación

Desde el proyecto consumidor:

```bash
npm install ../ruta/a/ReactLibrary
```

Después, importa los componentes y sus estilos:

```tsx
import { Button, Card, Stack } from '@gestor-tareas/react-components';
import '@gestor-tareas/react-components/styles.css';

export function Example() {
  return (
    <Card title="Mi tarea">
      <Stack direction="row" gap="sm">
        <span>Preparar la entrega</span>
        <Button onClick={() => console.log('Completada')}>Completar</Button>
      </Stack>
    </Card>
  );
}
```

Para crear un archivo instalable localmente:

```bash
npm pack
```

El archivo `.tgz` resultante se puede instalar con `npm install ./nombre-del-paquete.tgz`.