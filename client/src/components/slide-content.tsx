import { motion } from "framer-motion";
import { InvestmentChart } from "./investment-chart";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { SlideData } from "@shared/schema";

// Import generated images
import teamBgImage from "@assets/generated_images/Team_presentation_academic_background_9df5e1d2.png";
import ecosystemImage from "@assets/generated_images/Startup_investment_ecosystem_diagram_b4dc1768.png";
import angelImage from "@assets/generated_images/Angel_investor_mentorship_illustration_8e82fbea.png";
import mvpImage from "@assets/generated_images/MVP_validation_process_diagram_0bb6181c.png";
import acceleratorImage from "@assets/generated_images/Accelerator_incubator_ecosystem_building_e1c49f25.png";
import techInnovationImage from "@assets/generated_images/3D_tech_innovation_illustration_362afb7d.png";
import teamCollabImage from "@assets/generated_images/3D_team_collaboration_holographic_ba6ee29f.png";

interface SlideContentProps {
  slide: SlideData;
  isEditMode: boolean;
  onUpdateSlide: (slide: SlideData) => void;
}

const colorClasses = {
  primary: "text-primary bg-primary/10 border-primary/20",
  blue: "text-blue-600 bg-blue-50 border-blue-200",
  green: "text-green-600 bg-green-50 border-green-200",
  purple: "text-purple-600 bg-purple-50 border-purple-200",
  orange: "text-orange-600 bg-orange-50 border-orange-200",
  red: "text-red-600 bg-red-50 border-red-200",
  yellow: "text-yellow-600 bg-yellow-50 border-yellow-200",
};

export function SlideContent({ slide, isEditMode, onUpdateSlide }: SlideContentProps) {
  const handleTextEdit = (field: string, value: string) => {
    const updatedSlide = { ...slide };
    if (field === 'title' || field === 'subtitle') {
      updatedSlide[field] = value;
    } else if (field.startsWith('presentationInfo.')) {
      // Handle presentationInfo nested fields
      const nestedField = field.replace('presentationInfo.', '');
      updatedSlide.content = {
        ...updatedSlide.content,
        presentationInfo: {
          ...updatedSlide.content.presentationInfo,
          [nestedField]: value
        }
      };
    } else if (field.startsWith('teamMember.')) {
      // Handle team member nested fields
      const [, indexStr, memberField] = field.split('.');
      const index = parseInt(indexStr, 10);
      const updatedTeamMembers = [...(updatedSlide.content.teamMembers || [])];
      updatedTeamMembers[index] = {
        ...updatedTeamMembers[index],
        [memberField]: value
      };
      updatedSlide.content = {
        ...updatedSlide.content,
        teamMembers: updatedTeamMembers
      };
    }
    onUpdateSlide(updatedSlide);
  };

  const handlePhotoChange = (memberIndex: number, photoUrl: string) => {
    const updatedSlide = { ...slide };
    const updatedTeamMembers = [...(updatedSlide.content.teamMembers || [])];
    updatedTeamMembers[memberIndex] = {
      ...updatedTeamMembers[memberIndex],
      photo: photoUrl
    };
    updatedSlide.content = {
      ...updatedSlide.content,
      teamMembers: updatedTeamMembers
    };
    onUpdateSlide(updatedSlide);
  };

  const EditableText = ({ 
    children, 
    field, 
    className = "" 
  }: { 
    children: React.ReactNode; 
    field: string; 
    className?: string; 
  }) => (
    <div
      className={cn(
        className,
        isEditMode && "edit-mode"
      )}
      contentEditable={isEditMode}
      suppressContentEditableWarning={true}
      onBlur={(e) => handleTextEdit(field, e.target.textContent || "")}
      data-testid={`editable-${field}`}
    >
      {children}
    </div>
  );

  const renderSlideContent = () => {
    switch (slide.type) {
      case "intro":
        // First slide - Team presentation
        if (slide.content.presentationInfo && slide.content.teamMembers) {
          return (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full flex flex-col justify-center safe-area-container bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
              style={{
                minHeight: "100vh"
              }}
            >
              {/* Content */}
              <div className="flex flex-col h-full justify-center max-w-7xl mx-auto w-full">
                {/* Title and subtitle */}
                <motion.div 
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                    {slide.title}
                  </EditableText>
                  <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground mb-8">
                    {slide.subtitle}
                  </EditableText>
                  
                  {/* Presentation Info - Responsive Grid */}
                  <motion.div 
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    <div className="responsive-grid gap-4 text-sm">
                      <div data-testid="presentation-course" className="text-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Curso</div>
                        <EditableText field="presentationInfo.course" className="font-semibold text-primary text-base">
                          {slide.content.presentationInfo.course}
                        </EditableText>
                      </div>
                      <div data-testid="presentation-professor" className="text-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Professor</div>
                        <EditableText field="presentationInfo.professor" className="font-semibold text-base">
                          {slide.content.presentationInfo.professor}
                        </EditableText>
                      </div>
                      <div data-testid="presentation-semester" className="text-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Semestre</div>
                        <EditableText field="presentationInfo.semester" className="font-semibold text-base">
                          {slide.content.presentationInfo.semester}
                        </EditableText>
                      </div>
                      <div data-testid="presentation-duration" className="text-center">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Evento</div>
                        <EditableText field="presentationInfo.duration" className="font-semibold text-base">
                          {slide.content.presentationInfo.duration}
                        </EditableText>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Team Members - Simplified Layout */}
                <motion.div 
                  className="flex justify-center mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  <div className="responsive-grid team-grid-mobile team-grid-tablet team-grid-desktop w-full max-w-6xl">
                    {slide.content.teamMembers.map((member: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: 0.9 + index * 0.15, 
                          duration: 0.6, 
                          type: "spring",
                          stiffness: 100 
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                        className="flex flex-col items-center"
                      >
                        {/* Photo/Avatar */}
                        <motion.div 
                          className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg overflow-hidden border-4 border-white dark:border-gray-700 cursor-pointer group"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => {
                            if (isEditMode) {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = (e.target as HTMLInputElement)?.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const result = event.target?.result as string;
                                    handlePhotoChange(index, result);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }
                          }}
                        >
                          {member.photo ? (
                            <>
                              <img 
                                src={member.photo} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                              {isEditMode && (
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <span className="text-white text-xs">Alterar foto</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <>
                              <span className="text-2xl lg:text-3xl font-bold text-white">
                                {member.name.split(' ').map((n: string) => n[0]).join('')}
                              </span>
                              {isEditMode && (
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <span className="text-white text-xs">Adicionar foto</span>
                                </div>
                              )}
                            </>
                          )}
                        </motion.div>
                        
                        {/* Name */}
                        <EditableText 
                          field={`teamMember.${index}.name`} 
                          className="font-semibold text-center text-sm lg:text-base leading-tight" 
                        >
                          <h4 data-testid={`member-name-${index}`} className="text-gray-800 dark:text-gray-200">
                            {member.name}
                          </h4>
                        </EditableText>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          );
        }
        
        // Other intro slides
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            {/* Ecosystem image for overview slide */}
            {slide.content.ecosystemImage && (
              <div className="mb-8 flex justify-center">
                <img 
                  src={ecosystemImage} 
                  alt="Ecossistema de Investimento" 
                  className="responsive-image rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
              {slide.content.sections?.map((section: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="responsive-card hover:shadow-md transition-shadow">
                    <CardContent className="card-content-responsive">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          colorClasses[section.color as keyof typeof colorClasses] || colorClasses.primary
                        )}>
                          <i className={section.icon}></i>
                        </div>
                        <h3 className="text-xl font-semibold" data-testid={`section-title-${index}`}>
                          {section.title}
                        </h3>
                      </div>
                      <ul className="space-y-3 text-sm">
                        {section.items?.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start gap-2" data-testid={`section-item-${index}-${itemIndex}`}>
                            <i className={`${section.icon.split(' ')[1]} text-${section.color}-600 mt-0.5`}></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case "content":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pb-24"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            {/* Phases content (Impulso Inicial) */}
            {slide.content.phases && (
              <div className="space-y-8">
                <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                  {slide.content.phases.map((phase: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <Card className="responsive-card hover:shadow-md transition-shadow">
                        <CardContent className="card-content-responsive">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={cn(
                              "w-12 h-12 rounded-lg flex items-center justify-center",
                              colorClasses[phase.color as keyof typeof colorClasses] || colorClasses.primary
                            )}>
                              <i className={phase.icon}></i>
                            </div>
                            <h3 className="text-xl font-semibold" data-testid={`phase-title-${index}`}>
                              {phase.title}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4" data-testid={`phase-description-${index}`}>
                            {phase.description}
                          </p>
                          <ul className="space-y-2 text-sm">
                            {phase.keyPoints?.map((point: string, pointIndex: number) => (
                              <li key={pointIndex} className="flex items-start gap-2" data-testid={`phase-point-${index}-${pointIndex}`}>
                                <i className="fas fa-check text-green-600 mt-0.5"></i>
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {slide.content.challenges && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-6">Principais Desafios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {slide.content.challenges.map((challenge: any, index: number) => (
                        <Card key={index} className={cn("p-4 border-l-4", 
                          challenge.color === 'red' && "border-l-red-500 bg-red-50",
                          challenge.color === 'orange' && "border-l-orange-500 bg-orange-50",
                          challenge.color === 'yellow' && "border-l-yellow-500 bg-yellow-50"
                        )}>
                          <h4 className="font-semibold mb-2" data-testid={`challenge-title-${index}`}>
                            {challenge.title}
                          </h4>
                          <p className="text-sm text-muted-foreground" data-testid={`challenge-description-${index}`}>
                            {challenge.description}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MVP content */}
            {slide.content.mvpConcept && (
              <div className="space-y-8">
                {/* MVP Definition */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-lightbulb text-primary"></i>
                    {slide.content.mvpConcept.title}
                  </h3>
                  <p className="text-lg mb-6">{slide.content.mvpConcept.definition}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slide.content.mvpConcept.benefits?.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <i className="fas fa-check-circle text-green-600 mt-1"></i>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* MVP Process */}
                {slide.content.validationProcess && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Processo de Validação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {slide.content.validationProcess.map((step: any, index: number) => (
                        <Card key={index} className="p-4 text-center">
                          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                            {step.step}
                          </div>
                          <h4 className="font-semibold mb-2" data-testid={`step-title-${index}`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`step-description-${index}`}>
                            {step.description}
                          </p>
                          <div className="space-y-1">
                            {step.deliverables?.map((deliverable: string, delIndex: number) => (
                              <div key={delIndex} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {deliverable}
                              </div>
                            ))}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* MVP Image */}
                {slide.content.mvpImage && (
                  <div className="flex justify-center mt-8">
                    <img 
                      src={mvpImage} 
                      alt="Processo de Validação MVP" 
                      className="responsive-image rounded-lg shadow-md"
                    />
                  </div>
                )}

                {/* Metrics */}
                {slide.content.metrics && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Métricas de Sucesso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {slide.content.metrics.map((metric: any, index: number) => (
                        <Card key={index} className="p-6 text-center">
                          <div className="text-3xl font-bold text-primary mb-2">{metric.target}</div>
                          <h4 className="font-semibold mb-2">{metric.name}</h4>
                          <p className="text-sm text-muted-foreground">{metric.description}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Angel Investor content */}
            {slide.content.definition && slide.content.characteristics && (
              <div className="space-y-8">
                {/* Definition */}
                <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
                  <h3 className="text-2xl font-semibold mb-4">{slide.content.definition.title}</h3>
                  <p className="text-lg">{slide.content.definition.description}</p>
                </Card>

                {/* Characteristics */}
                <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                  {slide.content.characteristics.map((char: any, index: number) => (
                    <Card key={index} className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center",
                          colorClasses[char.color as keyof typeof colorClasses] || colorClasses.primary
                        )}>
                          <i className={char.icon}></i>
                        </div>
                        <h4 className="text-xl font-semibold">{char.title}</h4>
                      </div>
                      <ul className="space-y-2 text-sm">
                        {char.items?.map((item: string, itemIndex: number) => (
                          <li key={itemIndex} className="flex items-start gap-2">
                            <i className="fas fa-chevron-right text-primary mt-1 text-xs"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>

                {/* Process */}
                {slide.content.process && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{slide.content.process.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {slide.content.process.steps?.map((step: string, index: number) => (
                        <div key={index} className="text-center">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Angel Image */}
                {slide.content.angelImage && (
                  <div className="flex justify-center mt-8">
                    <img 
                      src={angelImage} 
                      alt="Investidores Anjo" 
                      className="responsive-image rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Seed Capital content */}
            {slide.content.seedConcept && (
              <div className="space-y-8">
                {/* Seed Concept */}
                <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
                  <h3 className="text-2xl font-semibold mb-4">{slide.content.seedConcept.title}</h3>
                  <p className="text-lg mb-4">{slide.content.seedConcept.description}</p>
                  <Badge variant="outline" className="text-sm">
                    <i className="fas fa-seedling mr-2"></i>
                    {slide.content.seedConcept.stage}
                  </Badge>
                </Card>

                {/* Investors */}
                {slide.content.investors && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Tipos de Investidores</h3>
                    <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                      {slide.content.investors.map((investor: any, index: number) => (
                        <Card key={index} className="p-6">
                          <h4 className="text-xl font-semibold mb-3 text-primary">{investor.type}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{investor.description}</p>
                          <div className="space-y-2 text-sm">
                            <div><strong>Ticket:</strong> {investor.ticket}</div>
                            <div><strong>Foco:</strong> {investor.focus}</div>
                            <div className="text-xs text-muted-foreground">
                              <strong>Exemplos:</strong> {investor.examples}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {slide.content.useCases && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Aplicação dos Recursos</h3>
                    <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                      {slide.content.useCases.map((useCase: any, index: number) => (
                        <Card key={index} className="p-6">
                          <h4 className="text-lg font-semibold mb-4 text-primary">{useCase.category}</h4>
                          <ul className="space-y-2 text-sm">
                            {useCase.items?.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <i className="fas fa-check text-green-600 mt-1 text-xs"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Milestones */}
                {slide.content.milestones && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Marcos Importantes</h3>
                    <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                      {slide.content.milestones.map((milestone: any, index: number) => (
                        <Card key={index} className="p-6 text-center bg-gradient-to-br from-blue-50 to-green-50">
                          <div className="text-2xl font-bold text-primary mb-2">{milestone.target}</div>
                          <h4 className="font-semibold mb-2">{milestone.metric}</h4>
                          <p className="text-sm text-muted-foreground">{milestone.importance}</p>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Accelerators content */}
            {slide.content.definitions && (
              <div className="space-y-8">
                {/* Definitions comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100">
                    <h3 className="text-2xl font-semibold mb-4 text-blue-800">
                      <i className="fas fa-seedling mr-2"></i>
                      {slide.content.definitions.incubadoras.title}
                    </h3>
                    <p className="text-blue-700 mb-4">{slide.content.definitions.incubadoras.description}</p>
                    <div className="space-y-2 text-sm text-blue-600">
                      <div><strong>Duração:</strong> {slide.content.definitions.incubadoras.duration}</div>
                      <div><strong>Estágio:</strong> {slide.content.definitions.incubadoras.stage}</div>
                      <div><strong>Investimento:</strong> {slide.content.definitions.incubadoras.investment}</div>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100">
                    <h3 className="text-2xl font-semibold mb-4 text-green-800">
                      <i className="fas fa-rocket mr-2"></i>
                      {slide.content.definitions.aceleradoras.title}
                    </h3>
                    <p className="text-green-700 mb-4">{slide.content.definitions.aceleradoras.description}</p>
                    <div className="space-y-2 text-sm text-green-600">
                      <div><strong>Duração:</strong> {slide.content.definitions.aceleradoras.duration}</div>
                      <div><strong>Estágio:</strong> {slide.content.definitions.aceleradoras.stage}</div>
                      <div><strong>Investimento:</strong> {slide.content.definitions.aceleradoras.investment}</div>
                    </div>
                  </Card>
                </div>

                {/* Top Programs */}
                {slide.content.topPrograms && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Principais Programas no Brasil</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {slide.content.topPrograms.map((program: any, index: number) => (
                        <Card key={index} className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h4 className="text-xl font-semibold text-primary">{program.name}</h4>
                            <Badge variant="outline">{program.type}</Badge>
                          </div>
                          <div className="space-y-2 text-sm mb-4">
                            <div><strong>Foco:</strong> {program.focus}</div>
                            <div><strong>Investimento:</strong> {program.investment}</div>
                            <div><strong>Destaque:</strong> {program.highlights}</div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {slide.content.benefits && (
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Benefícios dos Programas</h3>
                    <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                      {slide.content.benefits.map((benefit: any, index: number) => (
                        <Card key={index} className="p-6">
                          <h4 className="text-lg font-semibold mb-4 text-primary">{benefit.category}</h4>
                          <ul className="space-y-2 text-sm">
                            {benefit.items?.map((item: string, itemIndex: number) => (
                              <li key={itemIndex} className="flex items-start gap-2">
                                <i className="fas fa-star text-yellow-500 mt-1 text-xs"></i>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Accelerator Image */}
                {slide.content.acceleratorImage && (
                  <div className="flex justify-center mt-8">
                    <img 
                      src={acceleratorImage} 
                      alt="Ecossistema de Aceleradoras e Incubadoras" 
                      className="responsive-image rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            )}

            {slide.content.challenges && slide.content.opportunities && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="challenges-title">
                    Desafios para startups brasileiras
                  </h2>
                  {slide.content.challenges.map((challenge: any, index: number) => (
                    <Card key={index} className={cn("p-6 border", colorClasses[challenge.color as keyof typeof colorClasses])}>
                      <div className="flex items-start gap-3">
                        <i className="fas fa-exclamation-triangle mt-1"></i>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`challenge-title-${index}`}>
                            {challenge.title}
                          </h3>
                          <p className="text-sm" data-testid={`challenge-description-${index}`}>
                            {challenge.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="opportunities-title">
                    Oportunidades de crescimento
                  </h2>
                  {slide.content.opportunities.map((opportunity: any, index: number) => (
                    <Card key={index} className={cn("p-6 border", colorClasses[opportunity.color as keyof typeof colorClasses])}>
                      <div className="flex items-start gap-3">
                        <i className="fas fa-rocket mt-1"></i>
                        <div>
                          <h3 className="font-semibold mb-2" data-testid={`opportunity-title-${index}`}>
                            {opportunity.title}
                          </h3>
                          <p className="text-sm" data-testid={`opportunity-description-${index}`}>
                            {opportunity.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {slide.content.strategies && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" data-testid="strategies-title">
                    {slide.content.strategies.title}
                  </h2>
                  
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <i className="fas fa-presentation text-primary"></i>
                      Estrutura de um Pitch Deck Eficaz
                    </h3>
                    <ul className="space-y-3 text-sm">
                      {slide.content.strategies.pitchDeck?.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2" data-testid={`pitch-item-${index}`}>
                          <i className="fas fa-check text-green-600 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>

                  <Card className="p-6 bg-blue-50 border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Dicas para apresentação:</h4>
                    <ul className="space-y-2 text-sm text-blue-700">
                      {slide.content.strategies.tips?.map((tip: string, index: number) => (
                        <li key={index} className="flex items-start gap-2" data-testid={`tip-${index}`}>
                          <i className="fas fa-lightbulb text-blue-600 mt-0.5"></i>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>

                {slide.content.businessPlan && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-semibold" data-testid="business-plan-title">
                      {slide.content.businessPlan.title}
                    </h2>
                    
                    <div className="space-y-4">
                      {slide.content.businessPlan.sections?.map((section: any, index: number) => (
                        <Card key={index} className="p-6">
                          <h4 className="font-semibold text-primary mb-2" data-testid={`business-section-title-${index}`}>
                            {section.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-2" data-testid={`business-section-description-${index}`}>
                            {section.description}
                          </p>
                          {section.projections && (
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              {section.projections.map((projection: any, projIndex: number) => (
                                <div key={projIndex} className="text-center" data-testid={`projection-${projIndex}`}>
                                  <div className="font-semibold text-primary">{projection.year}</div>
                                  <div className="text-muted-foreground">{projection.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {slide.content.impacts && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slide.content.impacts.map((impact: any, index: number) => (
                    <Card key={index} className="p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2" data-testid={`impact-title-${index}`}>
                        <i className={impact.icon}></i>
                        {impact.category}
                      </h3>
                      <div className="space-y-4">
                        {impact.items?.map((item: string, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-start gap-3" data-testid={`impact-item-${index}-${itemIndex}`}>
                            <i className="fas fa-check-circle text-green-600 mt-1"></i>
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>

                {slide.content.ods && (
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <i className="fas fa-globe text-blue-600"></i>
                      Alinhamento com Objetivos de Desenvolvimento Sustentável
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Contribuição direta para os ODS da ONU:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {slide.content.ods.map((ods: any, index: number) => (
                        <div key={index} className={cn(
                          "flex items-start gap-4 p-4 rounded-lg border",
                          colorClasses[ods.color as keyof typeof colorClasses]
                        )}>
                          <div className="w-12 h-12 bg-current rounded-lg flex items-center justify-center text-white font-bold opacity-90">
                            {ods.number}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1" data-testid={`ods-title-${index}`}>
                              {ods.title}
                            </h4>
                            <p className="text-sm opacity-80" data-testid={`ods-description-${index}`}>
                              {ods.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {slide.content.statistics && (
                  <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                    {slide.content.statistics.map((stat: any, index: number) => (
                      <Card key={index} className="p-6 text-center bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="text-3xl font-bold text-blue-600 mb-2 animate-count-up" data-testid={`stat-value-${index}`}>
                          {stat.value}
                        </div>
                        <p className="text-sm text-blue-700" data-testid={`stat-label-${index}`}>
                          {stat.label}
                        </p>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );

      case "conclusion":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pb-24"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            {/* Key Takeaways */}
            {slide.content.keyTakeaways && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Principais Aprendizados</h3>
                <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                  {slide.content.keyTakeaways.map((takeaway: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-6 h-full bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <i className={takeaway.icon + " text-primary"}></i>
                          </div>
                          <h4 className="font-semibold text-lg" data-testid={`takeaway-title-${index}`}>
                            {takeaway.title}
                          </h4>
                        </div>
                        <p className="text-sm text-muted-foreground" data-testid={`takeaway-description-${index}`}>
                          {takeaway.description}
                        </p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Future Trends */}
            {slide.content.futureTrends && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Tendências Futuras</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {slide.content.futureTrends.map((trend: any, index: number) => (
                    <Card key={index} className="p-6 border-l-4 border-l-green-500">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-trending-up text-green-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-2" data-testid={`trend-title-${index}`}>
                            {trend.trend}
                          </h4>
                          <p className="text-sm text-muted-foreground" data-testid={`trend-description-${index}`}>
                            {trend.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            {slide.content.callToAction && (
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20">
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  <i className="fas fa-arrow-right mr-2"></i>
                  {slide.content.callToAction.title}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.content.callToAction.actions?.map((action: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary mt-1"></i>
                      <span className="text-sm">{action}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        );

      case "chart":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Volume de investimentos (2019-2024)
                </h3>
                <InvestmentChart data={slide.content.chartData} />
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {slide.content.stats?.map((stat: string, index: number) => (
                    <div key={index} className="flex items-center gap-2" data-testid={`chart-stat-${index}`}>
                      <i className="fas fa-arrow-up text-green-600"></i>
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <div className="space-y-6">
                <h3 className="text-xl font-semibold">
                  Casos de sucesso
                </h3>
                
                {slide.content.successCases?.map((case_: any, index: number) => (
                  <Card key={index} className={cn(
                    "p-6 bg-gradient-to-r border",
                    case_.color === 'purple' && "from-purple-50 to-purple-100 border-purple-200",
                    case_.color === 'red' && "from-red-50 to-red-100 border-red-200",
                    case_.color === 'green' && "from-green-50 to-green-100 border-green-200"
                  )}>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg",
                        case_.color === 'purple' && "bg-purple-600",
                        case_.color === 'red' && "bg-red-600",
                        case_.color === 'green' && "bg-green-600"
                      )}>
                        {case_.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className={cn(
                          "font-semibold mb-1",
                          case_.color === 'purple' && "text-purple-800",
                          case_.color === 'red' && "text-red-800",
                          case_.color === 'green' && "text-green-800"
                        )} data-testid={`success-case-name-${index}`}>
                          {case_.name}
                        </h4>
                        <p className={cn(
                          "text-sm mb-2",
                          case_.color === 'purple' && "text-purple-700",
                          case_.color === 'red' && "text-red-700",
                          case_.color === 'green' && "text-green-700"
                        )} data-testid={`success-case-description-${index}`}>
                          {case_.description}
                        </p>
                        <p className={cn(
                          "text-xs",
                          case_.color === 'purple' && "text-purple-600",
                          case_.color === 'red' && "text-red-600",
                          case_.color === 'green' && "text-green-600"
                        )} data-testid={`success-case-highlight-${index}`}>
                          <strong>Destaques:</strong> {case_.highlight}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "discussion":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pb-24"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">
                  Perguntas para reflexão
                </h2>

                <div className="grid grid-cols-1 gap-6">
                  {slide.content.questions?.map((question: any, index: number) => (
                    <Card key={index} className={cn(
                      "p-6 border-l-4",
                      question.color === 'blue' && "border-l-blue-500",
                      question.color === 'green' && "border-l-green-500",
                      question.color === 'purple' && "border-l-purple-500"
                    )}>
                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                          question.color === 'blue' && "bg-blue-100",
                          question.color === 'green' && "bg-green-100",
                          question.color === 'purple' && "bg-purple-100"
                        )}>
                          <span className={cn(
                            "font-semibold text-sm",
                            question.color === 'blue' && "text-blue-600",
                            question.color === 'green' && "text-green-600",
                            question.color === 'purple' && "text-purple-600"
                          )}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className={cn(
                            "font-semibold mb-2",
                            question.color === 'blue' && "text-blue-800",
                            question.color === 'green' && "text-green-800",
                            question.color === 'purple' && "text-purple-800"
                          )} data-testid={`discussion-question-${index}`}>
                            {question.question}
                          </h3>
                          <p className="text-sm text-muted-foreground" data-testid={`discussion-context-${index}`}>
                            {question.context}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {slide.content.interactionSpaces && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg border border-blue-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center justify-center gap-2">
                      <i className="fas fa-comments text-blue-600"></i>
                      Espaço para interação com a turma
                    </h3>
                    <p className="text-blue-700">
                      Compartilhe suas experiências e opiniões sobre os desafios enfrentados por empreendedores e como superá-los no contexto brasileiro.
                    </p>
                  </div>

                  <div className="responsive-grid mobile-stack tablet-grid desktop-grid">
                    {slide.content.interactionSpaces.map((space: any, index: number) => (
                      <Card key={index} className="p-4 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-2" data-testid={`interaction-space-title-${index}`}>
                          {space.title}
                        </h4>
                        <p className="text-sm text-gray-600" data-testid={`interaction-space-description-${index}`}>
                          {space.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {slide.content.academicContext && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <i className="fas fa-graduation-cap text-primary"></i>
                    Contexto Acadêmico e Científico
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Relevância Teórica</h4>
                      <p className="text-sm text-muted-foreground" data-testid="academic-theoretical">
                        {slide.content.academicContext.theoretical}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Aplicações Práticas</h4>
                      <p className="text-sm text-muted-foreground" data-testid="academic-practical">
                        {slide.content.academicContext.practical}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </motion.div>
        );


      case "references":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 pb-24"
          >
            <div className="mb-8">
              <EditableText field="title" className="mobile-title tablet-title desktop-title font-bold text-primary mb-4">
                {slide.title}
              </EditableText>
              <EditableText field="subtitle" className="mobile-subtitle tablet-subtitle desktop-subtitle text-muted-foreground">
                {slide.subtitle}
              </EditableText>
            </div>

            {/* Academic References */}
            {slide.content.academicReferences && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">
                  <i className="fas fa-graduation-cap mr-2 text-blue-600"></i>
                  Referências Acadêmicas
                </h3>
                <div className="space-y-4">
                  {slide.content.academicReferences.map((ref: any, index: number) => (
                    <Card key={index} className="p-4 border-l-4 border-l-blue-500">
                      <div className="text-sm">
                        <p className="font-semibold mb-2">
                          {ref.authors} ({ref.year}). 
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline"
                             data-testid={`link-academic-reference-${index}`}>
                            {ref.title}
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          {ref.publisher}.
                        </p>
                        {ref.journal && (
                          <p className="text-muted-foreground italic">
                            {ref.journal}
                          </p>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Reports */}
            {slide.content.industryReports && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">
                  <i className="fas fa-chart-bar mr-2 text-green-600"></i>
                  Relatórios Setoriais
                </h3>
                <div className="space-y-4">
                  {slide.content.industryReports.map((report: any, index: number) => (
                    <Card key={index} className="p-4 border-l-4 border-l-green-500">
                      <div className="text-sm">
                        <p className="font-semibold mb-2">
                          <a href={report.url} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline"
                             data-testid={`link-industry-report-${index}`}>
                            {report.title}
                          </a>
                        </p>
                        <p className="text-muted-foreground mb-1">
                          <strong>{report.organization}</strong>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Acessado em: {report.accessDate}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Data Sources */}
            {slide.content.dataSource && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">
                  <i className="fas fa-database mr-2 text-purple-600"></i>
                  Fontes de Dados
                </h3>
                <div className="space-y-4">
                  {slide.content.dataSource.map((source: any, index: number) => (
                    <Card key={index} className="p-4 border-l-4 border-l-purple-500">
                      <div className="text-sm">
                        <p className="font-semibold mb-2">
                          <a href={source.url} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline"
                             data-testid={`link-data-source-${index}`}>
                            {source.source}
                          </a>
                        </p>
                        <p className="text-muted-foreground">
                          {source.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Resources */}
            {slide.content.additionalResources && (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-4">
                  <i className="fas fa-link mr-2 text-orange-600"></i>
                  Recursos Adicionais
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {slide.content.additionalResources.map((resource: any, index: number) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                      <div className="text-sm">
                        <p className="font-semibold mb-2">
                          <a href={resource.url} target="_blank" rel="noopener noreferrer" 
                             className="text-primary hover:underline"
                             data-testid={`link-reference-${index}`}>
                            {resource.title}
                          </a>
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {resource.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tipo de slide não reconhecido: {slide.type}</p>
          </div>
        );
    }
  };

  return (
    <div className="slide-container slide-active" data-testid={`slide-content-${slide.type}`}>
      {renderSlideContent()}
    </div>
  );
}
