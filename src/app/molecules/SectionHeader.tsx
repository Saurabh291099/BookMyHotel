import Heading from "../atoms/Heading";
import Text from "../atoms/Text";

interface SectionHeaderProps {
  title: string;
  description: string;
  imageSrc?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
//   imageSrc,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <Heading type="h1" className="text-4xl font-bold mb-4">
          {title}
        </Heading>
        <div className="max-w-2xl text-center">
        <Text variant="body" className="text-lg mb-8">
          {description}{" "}
        </Text>
        </div>

      </div>
 
    </>
  );
};

export default SectionHeader;
