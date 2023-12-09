import { useState, type FC } from "react";
import { Button, Label, Modal, TextInput,Textarea } from "flowbite-react";
import Swal from 'sweetalert2';
import { useCreateClassMutation } from "../api/store/class/mutation";
interface CreateClassProps {
	handleCloseModalCreateClass: () => void;
	openModal: boolean;
}

const CreateClass: FC<CreateClassProps> = ({
	handleCloseModalCreateClass,
	openModal,
}): JSX.Element => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleChange = (error: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => 
        { setFormData({
            ...formData,
            [error.target.id]: error.target.value,
        }); };
    const mutation = useCreateClassMutation();
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
      // eslint-disable-next-line @typescript-eslint/require-await
      ): Promise<void> => {
		    event.preventDefault();
        mutation.mutate(formData,
        {
            onSuccess() { 
                Swal.fire({
            title: 'Success',
            text: 'Create class successfully',
            icon: 'success',
            }).then(() => {
              handleCloseModalCreateClass();
            })

            },
            onError(error) {
                console.log(error);
            },
        });

        
    }

      return (
        <>
          
      <Modal show={openModal} size="md" popup onClose={handleCloseModalCreateClass} >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Create class</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Class name" />
              </div>
              <TextInput id="name" onChange={handleChange} value={formData.name} placeholder="Web advance" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea id="description" onChange={handleChange} value={formData.description}  placeholder="Anything..."  />
            </div>
            
            <div className="w-full flex justify-end">
              <Button onClick={handleSubmit}>Create</Button>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
        </>
      )
      };

export default CreateClass;
