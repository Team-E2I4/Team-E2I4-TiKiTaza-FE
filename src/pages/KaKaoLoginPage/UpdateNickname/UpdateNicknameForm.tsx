import * as Form from '@radix-ui/react-form';

const UpdateNicknameForm = () => {
  return (
    <div>
      <Form.Root>
        <Form.Control asChild>
          <input type='text' />
        </Form.Control>
        <Form.Submit>
          <button>submit</button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
};

export default UpdateNicknameForm;
