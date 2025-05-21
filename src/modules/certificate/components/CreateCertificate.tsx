'use client';
import { ICertificateAttribute, ICertificateForm } from '../types';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Select,
  Textarea,
  VStack,
  useColorModeValue,
  FormHelperText,
  Flex,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';

interface CreateCertificateProps {
  onSubmit: (data: ICertificateForm) => Promise<void>;
  isLoading?: boolean;
  institutionName?: string;
}

export const CreateCertificate: FC<CreateCertificateProps> = ({
  onSubmit,
  isLoading = false,
  institutionName = '',
}) => {
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const [form, setForm] = useState<ICertificateForm>({
    institution_name: institutionName,
    certificate_name: '',
    recipient_name: '',
    recipient_address: '',
    description: '',
    issue_date: new Date().toISOString().split('T')[0],
    image: '',
    verification_url: '',
    attributes: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ICertificateForm, string>>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name as keyof ICertificateForm]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAttributeChange = (
    index: number,
    field: keyof ICertificateAttribute,
    value: string,
  ) => {
    setForm((prev) => {
      const updatedAttributes = [...prev.attributes];
      updatedAttributes[index] = {
        ...updatedAttributes[index],
        [field]: value,
      };
      return { ...prev, attributes: updatedAttributes };
    });
  };

  const addAttribute = () => {
    setForm((prev) => ({
      ...prev,
      attributes: [...prev.attributes, { trait_type: '', value: '' }],
    }));
  };

  const removeAttribute = (index: number) => {
    setForm((prev) => {
      const updatedAttributes = [...prev.attributes];
      updatedAttributes.splice(index, 1);
      return { ...prev, attributes: updatedAttributes };
    });
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ICertificateForm, string>> = {};

    if (!form.institution_name) newErrors.institution_name = 'Institution name is required';
    if (!form.certificate_name) newErrors.certificate_name = 'Certificate name is required';
    if (!form.recipient_name) newErrors.recipient_name = 'Recipient name is required';
    if (!form.recipient_address)
      newErrors.recipient_address = 'Recipient wallet address is required';
    if (!form.issue_date) newErrors.issue_date = 'Issue date is required';

    const invalidAttributes = form.attributes.some((attr) => !attr.trait_type || !attr.value);
    if (invalidAttributes) {
      toast({
        title: 'Invalid attributes',
        description: 'All attributes must have both type and value fields filled',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && !invalidAttributes;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(form);
      toast({
        title: 'Certificate created',
        description: 'The certificate has been minted as an NFT',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating certificate:', error);
      toast({
        title: 'Error creating certificate',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={8} bg={bgColor} minH="100vh" data-testid="create-certificate-form">
      <Container maxW="container.md">
        <Box
          bg={cardBg}
          p={6}
          borderRadius="lg"
          borderColor={borderColor}
          borderWidth="1px"
          shadow="sm"
        >
          <Heading size="lg" mb={6}>
            Create Certificate NFT
          </Heading>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <Heading size="sm">Basic Information</Heading>

              <FormControl isInvalid={!!errors.institution_name} isRequired>
                <FormLabel>Institution Name</FormLabel>
                <Input
                  name="institution_name"
                  value={form.institution_name}
                  onChange={handleChange}
                  placeholder="Enter the name of the institution"
                />
                <FormErrorMessage>{errors.institution_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.certificate_name} isRequired>
                <FormLabel>Certificate Name</FormLabel>
                <Input
                  name="certificate_name"
                  value={form.certificate_name}
                  onChange={handleChange}
                  placeholder="e.g. Advanced Web Development Certificate"
                />
                <FormErrorMessage>{errors.certificate_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe what this certificate represents..."
                  rows={3}
                />
                <FormHelperText>
                  Provide details about the certificate, course content, or achievements
                </FormHelperText>
              </FormControl>

              <Divider my={2} />
              <Heading size="sm">Recipient Information</Heading>

              <FormControl isInvalid={!!errors.recipient_name} isRequired>
                <FormLabel>Recipient Name</FormLabel>
                <Input
                  name="recipient_name"
                  value={form.recipient_name}
                  onChange={handleChange}
                  placeholder="Full name of the recipient"
                />
                <FormErrorMessage>{errors.recipient_name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.recipient_address} isRequired>
                <FormLabel>Recipient Wallet Address</FormLabel>
                <Input
                  name="recipient_address"
                  value={form.recipient_address}
                  onChange={handleChange}
                  placeholder="Enter the recipient's wallet address"
                />
                <FormHelperText>
                  This is the blockchain address where the certificate NFT will be sent
                </FormHelperText>
                <FormErrorMessage>{errors.recipient_address}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.issue_date} isRequired>
                <FormLabel>Issue Date</FormLabel>
                <Input
                  name="issue_date"
                  type="date"
                  value={form.issue_date}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.issue_date}</FormErrorMessage>
              </FormControl>

              <Divider my={2} />
              <Heading size="sm">Certificate Media</Heading>

              <FormControl>
                <FormLabel>Certificate Image URL</FormLabel>
                <Input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Enter URL to certificate image"
                />
                <FormHelperText>Provide a URL to the certificate image or design</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Verification URL (Optional)</FormLabel>
                <Input
                  name="verification_url"
                  value={form.verification_url}
                  onChange={handleChange}
                  placeholder="https://..."
                />
                <FormHelperText>External URL where the certificate can be verified</FormHelperText>
              </FormControl>

              <Divider my={2} />
              <Box>
                <Flex justify="space-between" align="center" mb={3}>
                  <Heading size="sm">Certificate Attributes</Heading>
                  <Button
                    leftIcon={<Plus size={16} />}
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    onClick={addAttribute}
                  >
                    Add Attribute
                  </Button>
                </Flex>

                <Text fontSize="sm" mb={4} color="gray.600">
                  Add custom attributes like course duration, grade, skills, etc.
                </Text>

                {form.attributes.length === 0 ? (
                  <Alert status="info" borderRadius="md" mb={4}>
                    <AlertIcon />
                    <AlertDescription>
                      No attributes added yet. Click &quot;Add Attribute&quot; to add details like
                      course duration, grade, or specific skills.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <VStack spacing={3} align="stretch">
                    {form.attributes.map((attr, index) => (
                      <HStack key={index} spacing={2}>
                        <FormControl isRequired>
                          <Input
                            placeholder="Attribute Name (e.g. Grade)"
                            value={attr.trait_type}
                            onChange={(e) =>
                              handleAttributeChange(index, 'trait_type', e.target.value)
                            }
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <Input
                            placeholder="Value (e.g. A+)"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                          />
                        </FormControl>
                        <IconButton
                          aria-label="Remove attribute"
                          icon={<Trash2 size={16} />}
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => removeAttribute(index)}
                        />
                      </HStack>
                    ))}
                  </VStack>
                )}
              </Box>

              <Divider my={4} />

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                isLoading={isLoading}
                loadingText="Creating Certificate..."
              >
                Mint Certificate NFT
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default CreateCertificate;
